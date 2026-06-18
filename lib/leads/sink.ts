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

  constructor(webhookUrl: string | undefined) {
    this.webhookUrl = webhookUrl?.trim() || undefined;
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

    try {
      const res = await fetch(this.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        redirect: "follow", // Apps Script responds via a 302 to googleusercontent.com
        signal: controller.signal,
      });

      if (!res.ok) {
        console.error(
          `[SheetsSink] webhook responded ${res.status} ${res.statusText}`
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
