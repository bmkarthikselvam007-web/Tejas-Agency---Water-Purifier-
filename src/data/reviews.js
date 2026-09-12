/**
 * CUSTOMER REVIEWS — DEMO DATA
 * ---------------------------------------------------------------------------
 * These are NOT genuine customer reviews. They are clearly flagged demo
 * entries used only to build and review the frontend. Every record carries
 * `isDemoData: true`, and the UI shows a visible "demo content" notice while
 * that flag is present.
 *
 * When real reviews (Google reviews or collected testimonials) are available,
 * replace this file and set `isDemoData: false`.
 * ---------------------------------------------------------------------------
 */

export const REVIEW_TOPICS = {
  RO: "ro-purifier",
  ALKALINE: "alkaline-ionizer",
  SERVICE: "service",
  INSTALLATION: "installation",
};

export const reviews = [
  {
    id: 1,
    name: "[Customer Name 1]",
    location: "Madurai",
    rating: 5,
    topic: REVIEW_TOPICS.RO,
    date: "2025-11-14",
    title: "Helpful guidance while choosing",
    body: "Placeholder review text for the frontend demo. This is where a genuine customer comment about product guidance and purchase experience will appear.",
    isDemoData: true,
  },
  {
    id: 2,
    name: "[Customer Name 2]",
    location: "Madurai",
    rating: 5,
    topic: REVIEW_TOPICS.INSTALLATION,
    date: "2025-11-02",
    title: "Installation completed neatly",
    body: "Placeholder review text for the frontend demo. A real comment about installation timing and workmanship will replace this entry.",
    isDemoData: true,
  },
  {
    id: 3,
    name: "[Customer Name 3]",
    location: "Madurai",
    rating: 4,
    topic: REVIEW_TOPICS.SERVICE,
    date: "2025-10-21",
    title: "Filter replacement handled quickly",
    body: "Placeholder review text for the frontend demo. A real service or filter replacement comment will replace this entry.",
    isDemoData: true,
  },
  {
    id: 4,
    name: "[Customer Name 4]",
    location: "Madurai",
    rating: 5,
    topic: REVIEW_TOPICS.ALKALINE,
    date: "2025-10-08",
    title: "Explained the ionizer functions clearly",
    body: "Placeholder review text for the frontend demo. A real comment about the LifeCore ionizer demonstration will replace this entry.",
    isDemoData: true,
  },
  {
    id: 5,
    name: "[Customer Name 5]",
    location: "Madurai",
    rating: 5,
    topic: REVIEW_TOPICS.RO,
    date: "2025-09-27",
    title: "Good product options to compare",
    body: "Placeholder review text for the frontend demo. A real comment about the range of products available will replace this entry.",
    isDemoData: true,
  },
  {
    id: 6,
    name: "[Customer Name 6]",
    location: "Madurai",
    rating: 4,
    topic: REVIEW_TOPICS.SERVICE,
    date: "2025-09-12",
    title: "Easy to reach on WhatsApp",
    body: "Placeholder review text for the frontend demo. A real comment about response time and communication will replace this entry.",
    isDemoData: true,
  },
  {
    id: 7,
    name: "[Customer Name 7]",
    location: "Madurai",
    rating: 5,
    topic: REVIEW_TOPICS.INSTALLATION,
    date: "2025-08-30",
    title: "Demonstrated how to use the unit",
    body: "Placeholder review text for the frontend demo. A real comment about the handover and usage demonstration will replace this entry.",
    isDemoData: true,
  },
  {
    id: 8,
    name: "[Customer Name 8]",
    location: "Madurai",
    rating: 5,
    topic: REVIEW_TOPICS.RO,
    date: "2025-08-16",
    title: "Suitable model suggested for our water",
    body: "Placeholder review text for the frontend demo. A real comment about model selection for Madurai water conditions will replace this entry.",
    isDemoData: true,
  },
];

export const reviewFilters = [
  { id: "all", label: "All reviews" },
  { id: REVIEW_TOPICS.RO, label: "RO Purifiers" },
  { id: REVIEW_TOPICS.ALKALINE, label: "Water Ionizers" },
  { id: REVIEW_TOPICS.SERVICE, label: "Service" },
  { id: REVIEW_TOPICS.INSTALLATION, label: "Installation" },
];

export default reviews;
