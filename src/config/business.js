/**
 * Central business configuration.
 *
 * IMPORTANT: every value marked REPLACE_WITH_* is a placeholder.
 * The agency owner will supply the real values — update them here ONLY.
 * Nothing in the UI should hardcode a phone number, address or map URL.
 */

export const businessConfig = {
  name: "Tejas Agency",
  tagline: "RO Water Purifiers & Alkaline Water Ionizers",
  city: "Madurai",
  state: "Tamil Nadu",

  /* Contact — digits only for phone/whatsapp, including country code. */
  phone: "REPLACE_WITH_PHONE", // e.g. "919876543210"
  phoneDisplay: "[Business Phone]",
  whatsapp: "REPLACE_WITH_WHATSAPP", // e.g. "919876543210"
  whatsappDisplay: "[WhatsApp Number]",
  email: "REPLACE_WITH_EMAIL",
  emailDisplay: "[Business Email]",

  /* Location */
  address: "[Business Address], Madurai, Tamil Nadu",
  addressLines: [
    "[Shop Name / Door No.]",
    "[Street / Area]",
    "Madurai, Tamil Nadu [PIN]",
  ],
  mapsUrl: "REPLACE_WITH_GOOGLE_MAPS_URL",
  mapsEmbedUrl: "REPLACE_WITH_GOOGLE_MAPS_EMBED_URL",

  /* Hours */
  businessHours: "[Business Hours]",
  businessHoursDetail: [
    { days: "Monday – Saturday", hours: "[Opening Time] – [Closing Time]" },
    { days: "Sunday", hours: "[Sunday Hours]" },
  ],

  /* Service coverage (used for copy only — no claims beyond this list) */
  serviceAreas: ["Madurai city", "Surrounding areas in and around Madurai"],

  /* Social — add only real, verified accounts. */
  social: {
    instagram: "https://www.instagram.com/tejasagencymadurai/",
    instagramHandle: "@tejasagencymadurai",
    facebook: "",
    youtube: "",
  },

  /*
   * Google Business Profile.
   * Placeholder until the listing URL is confirmed — the Reviews page shows a
   * "link coming soon" state while this is unset and turns into a working link
   * the moment it is filled in.
   */
  googleReviewUrl: "REPLACE_WITH_GOOGLE_REVIEW_URL",
  googleWriteReviewUrl: "REPLACE_WITH_GOOGLE_WRITE_REVIEW_URL",

  /* Site metadata used by the SEO helper */
  siteUrl: "REPLACE_WITH_SITE_URL", // e.g. "https://www.tejasagency.in"
  defaultOgImage: "/images/branding/og-image.svg",
};

/** True when a placeholder is still in place — lets the UI degrade gracefully. */
export const isPlaceholder = (value) =>
  typeof value !== "string" ||
  value.trim() === "" ||
  value.startsWith("REPLACE_WITH") ||
  (value.startsWith("[") && value.endsWith("]"));

export default businessConfig;
