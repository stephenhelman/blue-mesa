import { SheetsSink, type LeadSink } from "@/lib/leads/sink";

/**
 * Returns the active lead sink. Today: Google Sheets via Apps Script webhook.
 * Later (GoHighLevel): swap this one line for `new GHLSink(...)` — the route,
 * validation, and form never change.
 */
export function getLeadSink(): LeadSink {
  return new SheetsSink(process.env.LEADS_WEBHOOK_URL);
}

export type { Lead, LeadSink, ProjectType } from "@/lib/leads/sink";
