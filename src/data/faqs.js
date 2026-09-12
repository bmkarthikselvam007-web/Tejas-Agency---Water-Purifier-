/**
 * FAQ CONTENT
 * ---------------------------------------------------------------------------
 * Answers are written generically and deliberately avoid specific business
 * claims, medical claims and manufacturer specifications. The agency owner
 * should review and adjust the wording before launch.
 * ---------------------------------------------------------------------------
 */

export const FAQ_CATEGORIES = {
  GENERAL: "general",
  RO: "ro",
  ALKALINE: "alkaline",
  SERVICE: "service",
};

export const faqCategories = [
  { id: "all", label: "All questions" },
  { id: FAQ_CATEGORIES.GENERAL, label: "General" },
  { id: FAQ_CATEGORIES.RO, label: "RO Purifiers" },
  { id: FAQ_CATEGORIES.ALKALINE, label: "Water Ionizers" },
  { id: FAQ_CATEGORIES.SERVICE, label: "Service & Installation" },
];

export const faqs = [
  {
    id: 1,
    category: FAQ_CATEGORIES.RO,
    question: "Which RO purifier is best for my home?",
    answer:
      "It depends on your water source, the TDS level at your location, how many people use the water each day and how much storage you need. Share these details with us on WhatsApp or by phone and we will shortlist suitable models from the range we stock.",
    showOnHome: true,
  },
  {
    id: 2,
    category: FAQ_CATEGORIES.SERVICE,
    question: "Do you provide RO installation?",
    answer:
      "Yes. Installation support is part of the service we offer for products purchased from us. Contact us with your location and preferred time and we will confirm the details.",
    showOnHome: true,
  },
  {
    id: 3,
    category: FAQ_CATEGORIES.SERVICE,
    question: "Do you provide RO service in Madurai?",
    answer:
      "Yes. We cover RO service, repair, filter replacement and membrane replacement in Madurai and the surrounding areas. Message us on WhatsApp with the product details and the problem you are facing.",
    showOnHome: true,
  },
  {
    id: 4,
    category: FAQ_CATEGORIES.SERVICE,
    question: "How often do RO filters need replacement?",
    answer:
      "Filter life depends on your input water quality and how much water you use. As a general guide, pre-filters are checked more frequently than the RO membrane. We will advise a schedule for your specific unit and water conditions rather than a fixed rule.",
    showOnHome: true,
  },
  {
    id: 5,
    category: FAQ_CATEGORIES.GENERAL,
    question: "What is TDS?",
    answer:
      "TDS stands for Total Dissolved Solids - a measure of the dissolved minerals and salts present in water, usually expressed in parts per million (ppm). Knowing the TDS of your supply helps decide whether an RO purifier is needed and which configuration is suitable.",
    showOnHome: true,
  },
  {
    id: 6,
    category: FAQ_CATEGORIES.ALKALINE,
    question: "What is a water ionizer?",
    answer:
      "A water ionizer is an appliance that passes filtered water across electrode plates. Through electrolysis the water is separated into an alkaline stream and an acidic stream, and you select the level you want from the control panel.",
    showOnHome: true,
  },
  {
    id: 7,
    category: FAQ_CATEGORIES.ALKALINE,
    question: "What is alkaline ionized water?",
    answer:
      "Alkaline ionized water is the alkaline output stream produced by a water ionizer through electrolysis. We can explain the product functions, settings and specifications. We do not make health or medical claims - for health related questions please consult a qualified professional.",
    showOnHome: true,
  },
  {
    id: 8,
    category: FAQ_CATEGORIES.ALKALINE,
    question: "Do LifeCore products require installation?",
    answer:
      "Yes. A water ionizer needs a water inlet connection, a power point and a drain outlet for the acidic stream. Counter-top models install beside the tap, while under-counter models need cabinet space. We arrange installation and demonstrate the controls at handover.",
    showOnHome: true,
  },
  {
    id: 9,
    category: FAQ_CATEGORIES.RO,
    question: "What is the difference between RO, UV and UF?",
    answer:
      "RO (reverse osmosis) pushes water through a semi-permeable membrane and is used where dissolved solids are high. UV uses ultraviolet light as an additional treatment stage. UF (ultrafiltration) uses a hollow fibre membrane and works without electricity. Many home purifiers combine these stages.",
  },
  {
    id: 10,
    category: FAQ_CATEGORIES.RO,
    question: "How much storage capacity do I need?",
    answer:
      "Storage depends on family size and how often your supply is interrupted. Smaller households often manage with 6-8 litres, while larger families or homes with irregular supply usually prefer 10-12 litres or more.",
  },
  {
    id: 11,
    category: FAQ_CATEGORIES.RO,
    question: "Can an RO purifier be used with borewell water?",
    answer:
      "In many cases yes, but it depends on the TDS and hardness of the borewell water at your location. Higher TDS water needs a purifier rated for it, and in some cases additional pre-treatment. Tell us about your water and we will advise.",
  },
  {
    id: 12,
    category: FAQ_CATEGORIES.GENERAL,
    question: "Do you share prices on the website?",
    answer:
      "Prices vary with model, offers and installation requirements, so the website shows 'Contact for Price'. Send us the product you are interested in on WhatsApp and we will share the current price.",
  },
  {
    id: 13,
    category: FAQ_CATEGORIES.GENERAL,
    question: "Where is Tejas Agency located?",
    answer:
      "We are based in Madurai, Tamil Nadu. The full address, map location and business hours are listed on the Contact page.",
  },
  {
    id: 14,
    category: FAQ_CATEGORIES.SERVICE,
    question: "Do you service purifiers that were not bought from you?",
    answer:
      "Share the brand, model and the issue on WhatsApp and we will tell you whether we can support that unit and what the service would involve.",
  },
  {
    id: 15,
    category: FAQ_CATEGORIES.SERVICE,
    question: "How do I book a service visit?",
    answer:
      "Message us on WhatsApp or call us with your location, the product details and a convenient time. We will confirm the visit and what the service is likely to cover.",
  },
  {
    id: 16,
    category: FAQ_CATEGORIES.ALKALINE,
    question: "Does a water ionizer replace an RO purifier?",
    answer:
      "They are different products. An ionizer filters the incoming water and then separates it into alkaline and acidic streams. Depending on your water quality, a pre-treatment stage may still be recommended. We will explain what suits your supply before you decide.",
  },
];

export default faqs;
