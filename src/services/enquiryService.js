/**
 * ENQUIRY SERVICE
 * ---------------------------------------------------------------------------
 * FRONTEND ONLY. Nothing is sent anywhere in this version.
 *
 * The contact form calls `submitEnquiry()` exactly as it would in production.
 * When the backend exists, replace the body of `submitEnquiry` with the real
 * POST request; the form component does not need to change.
 *
 *   export async function submitEnquiry(payload) {
 *     const response = await fetch(`${API_BASE_URL}/enquiries`, {
 *       method: "POST",
 *       headers: { "Content-Type": "application/json" },
 *       body: JSON.stringify(payload),
 *     });
 *     if (!response.ok) throw new Error("Enquiry could not be submitted");
 *     return response.json();
 *   }
 * ---------------------------------------------------------------------------
 */

import { delay } from "../utils/helpers";

/** Requirement options offered in the contact form. */
export const enquiryRequirements = [
  { value: "ro-purifier", label: "RO Water Purifier" },
  { value: "alkaline-ionizer", label: "Alkaline Water Ionizer" },
  { value: "ro-service", label: "RO Service / Repair" },
  { value: "installation", label: "Installation" },
  { value: "other", label: "Other enquiry" },
];

/**
 * Demo submit handler.
 * Resolves with a mock reference so the UI can show a realistic success state,
 * while making it explicit that no data left the browser.
 */
export async function submitEnquiry(payload) {
  await delay(700);

  // Deliberately local only — logged for the demo, never transmitted.
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info("[demo] Enquiry captured locally (no backend yet):", payload);
  }

  return {
    success: true,
    delivered: false,
    reference: `DEMO-${Date.now().toString().slice(-6)}`,
    message:
      "Thank you! Your enquiry has been recorded for this demo. Our team will contact you after backend integration.",
  };
}
