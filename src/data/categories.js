/**
 * Product categories.
 * DEMO DATA — descriptions and images are placeholders for the frontend review.
 * The structure matches what the future backend / admin panel will return.
 */

export const CATEGORY_IDS = {
  RO: "ro-water-purifiers",
  ALKALINE: "alkaline-water-ionizers",
};

/** Product-level category keys (singular) used on each product record. */
export const PRODUCT_CATEGORY_KEYS = {
  RO: "ro-water-purifier",
  ALKALINE: "alkaline-water-ionizer",
};

export const categories = [
  {
    id: CATEGORY_IDS.RO,
    productKey: PRODUCT_CATEGORY_KEYS.RO,
    name: "RO Water Purifiers",
    shortName: "RO Purifiers",
    slug: "ro-water-purifiers",
    tagline: "For everyday drinking water at home",
    description:
      "Explore our range of RO water purifiers for homes and different water requirements.",
    longDescription:
      "RO water purifiers use a reverse osmosis membrane, usually combined with UV, UF or mineral stages, to treat water for everyday drinking. The right model depends on your water source, the TDS level at your location, how many people use the water and how much storage you need. Tejas Agency helps you shortlist a suitable model and supports you with installation and service afterwards.",
    image: "/images/products/ro/category-ro.svg",
    icon: "droplet",
    ctaLabel: "View RO Purifiers",
    order: 1,
    active: true,
  },
  {
    id: CATEGORY_IDS.ALKALINE,
    productKey: PRODUCT_CATEGORY_KEYS.ALKALINE,
    name: "Alkaline Water Ionizers",
    shortName: "Water Ionizers",
    slug: "alkaline-water-ionizers",
    tagline: "LifeCore ionizer range",
    description:
      "Explore LifeCore alkaline water ionizers and learn more about alkaline ionized water.",
    longDescription:
      "Water ionizers use electrolysis to separate incoming filtered water into alkaline and acidic streams, letting you select a pH level for different uses. These are premium appliances with their own filters, electrode plates, display panels and installation requirements. Tejas Agency stocks the LifeCore range and can explain the functions, specifications and installation before you decide.",
    image: "/images/products/lifecore/category-lifecore.svg",
    icon: "ionizer",
    ctaLabel: "View Alkaline Water Ionizers",
    order: 2,
    active: true,
  },
];

export default categories;
