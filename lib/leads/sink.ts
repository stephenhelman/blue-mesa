/**
 * Lead-sink abstraction.
 *
 * Leads route to Google Sheets now, GoHighLevel later. Everything upstream
 * (form, /api/lead route, validation) talks ONLY to the LeadSink interface,
 * so swapping to GHL later is a single-file change with zero form/UI churn.
 */

export type ProjectType = "pool" | "spa" | "both" | "unsure";

export interface Lead {
  name: string;
  phone: string;
  email?: string;
  projectType: ProjectType;
  message?: string;
  source: string; // e.g. "website-consult-form"
  createdAt: string; // ISO 8601
}

export interface LeadSink {
  capture(lead: Lead): Promise<{ ok: boolean }>;
}

/** Thrown when the sink isn't configured (e.g. missing webhook URL). */
export class LeadSinkConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LeadSinkConfigError";
  }
}

/**
 * Google Sheets sink.
 *
 * POSTs the lead as JSON to a Google Apps Script web app whose `doPost`
 * appends a row to the sheet. No service account, no `googleapis` dependency,
 * no OAuth scopes. The web-app URL is server-side only.
 *
 * Deploy steps + the Apps Script source live in `docs/google-apps-script.md`.
 */
export class SheetsSink implements LeadSink {
  private readonly webhookUrl: string | undefined;
  /** Optional shared secret. When set, sent as a top-level `secret` body field
   *  to match the Apps Script's SHARED_SECRET gate. Never part of the Lead type. */
  private readonly secret: string | undefined;

  constructor(webhookUrl: string | undefined, secret?: string | undefined) {
    this.webhookUrl = webhookUrl?.trim() || undefined;
    this.secret = secret?.trim() || undefined;
  }

  async capture(lead: Lead): Promise<{ ok: boolean }> {
    if (!this.webhookUrl) {
      // Configuration gap, not a user error — surface loudly server-side.
      throw new LeadSinkConfigError(
        "LEADS_WEBHOOK_URL is not set. Add the Google Apps Script web-app URL to the environment."
      );
    }

    // Don't let a hung webhook hang the request.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    // Attach the shared secret as a top-level field only when configured, so the
    // form still works against an Apps Script that has no secret gate.
    const payload = this.secret ? { ...lead, secret: this.secret } : { ...lead };

    try {
      const res = await fetch(this.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow", // Apps Script responds via a 302 to googleusercontent.com
        signal: controller.signal,
      });

      // Read the body ONCE, before parsing.
      const rawText = await res.text();

      // ---- TEMPORARY DIAGNOSTICS (remove once the sheet write is confirmed) ----
      // res.redirected/res.url reveal the 302->googleusercontent hop and whether
      // a POST->GET downgrade dropped the body (HTML body = wrong handler hit).
      console.log(
        "[lead webhook]",
        res.status,
        "redirected:", res.redirected,
        "finalUrl:", res.url,
        "body:", rawText.slice(0, 500)
      );
      console.log(
        "[lead webhook] LEADS_WEBHOOK_SECRET present:",
        Boolean(this.secret)
      );
      // ------------------------------------------------------------------------

      if (!res.ok) {
        console.error(
          `[SheetsSink] webhook responded ${res.status} ${res.statusText}`
        );
        return { ok: false };
      }

      // Apps Script returns HTTP 200 even on internal failure, so the HTTP status
      // is NOT proof of a sheet write. Trust ONLY a parsed { ok: true } body.
      let parsed: { ok?: boolean; error?: string } | null = null;
      try {
        parsed = JSON.parse(rawText);
      } catch {
        console.error(
          "[SheetsSink] webhook returned a non-JSON body (likely a redirect/method " +
            "downgrade or an Apps Script error page); treating as failure."
        );
        return { ok: false };
      }

      if (parsed?.ok !== true) {
        console.error(
          "[SheetsSink] webhook reported failure:",
          parsed?.error ?? JSON.stringify(parsed)
        );
        return { ok: false };
      }

      return { ok: true };
    } catch (err) {
      console.error("[SheetsSink] failed to reach webhook:", err);
      return { ok: false };
    } finally {
      clearTimeout(timeout);
    }
  }
}
