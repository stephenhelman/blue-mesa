import type { Lead, ProjectType } from "@/lib/leads/sink";

const PROJECT_TYPES: ProjectType[] = ["pool", "spa", "both", "unsure"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FieldErrors = Partial<
  Record<"name" | "phone" | "email" | "projectType" | "message", string>
>;

export type ValidationResult =
  | { ok: true; lead: Omit<Lead, "source" | "createdAt"> }
  | { ok: false; errors: FieldErrors };

/**
 * Normalize a US phone number to E.164 (+1XXXXXXXXXX).
 * Returns null if it can't be made into a plausible US number.
 */
export function normalizePhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  // Allow already-formatted international with leading + and 11-15 digits.
  if (input.trim().startsWith("+") && digits.length >= 11 && digits.length <= 15) {
    return `+${digits}`;
  }
  return null;
}

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Validates and normalizes a raw request body into a partial Lead.
 * Pure (no env, no I/O) so it's trivially testable and reusable.
 */
export function validateLead(body: unknown): ValidationResult {
  const data = (body ?? {}) as Record<string, unknown>;
  const errors: FieldErrors = {};

  const name = asString(data.name);
  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "That name is too long.";

  const rawPhone = asString(data.phone);
  const phone = normalizePhone(rawPhone);
  if (!rawPhone) errors.phone = "Please enter a phone number.";
  else if (!phone) errors.phone = "Please enter a valid phone number.";

  const email = asString(data.email);
  if (email && !EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (email.length > 200) errors.email = "That email is too long.";

  let projectType = asString(data.projectType) as ProjectType;
  if (!PROJECT_TYPES.includes(projectType)) projectType = "unsure";

  const message = asString(data.message);
  if (message.length > 2000) errors.message = "Please shorten your message.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    lead: {
      name,
      phone: phone as string,
      ...(email ? { email } : {}),
      projectType,
      ...(message ? { message } : {}),
    },
  };
}
