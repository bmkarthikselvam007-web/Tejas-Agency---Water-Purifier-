/**
 * PRODUCT CATALOGUE — DEMO DATA
 * ---------------------------------------------------------------------------
 * Every product below is placeholder/demo content created so the frontend can
 * be reviewed before the real catalogue is supplied. Model names, features and
 * specifications are generic and MUST be replaced with the information the
 * agency owner provides (real names, models, images, specs, warranty, price).
 *
 * The shape of each record is the contract the future backend API will return,
 * so the UI will not change when this file is swapped for a service call.
 * ---------------------------------------------------------------------------
 */

import { PRODUCT_CATEGORY_KEYS } from "./categories";

const RO = PRODUCT_CATEGORY_KEYS.RO;
const ALKALINE = PRODUCT_CATEGORY_KEYS.ALKALINE;

/** Defaults applied to every record so individual entries stay readable. */
const withDefaults = (product) => ({
  price: null,
  priceDisplay: "Contact for Price",
  featured: false,
  active: true,
  isDemoData: true,
  ...product,
  gallery: product.gallery?.length ? product.gallery : [product.image],
});

const roProducts = [
  {
    id: 1,
    category: RO,
    name: "Aqua Home RO + UV + UF Water Purifier",
    model: "DEMO-RO-101",
    slug: "aqua-home-ro-uv-uf",
    image: "/images/products/ro/ro-wall-mount.svg",
    shortDescription:
      "A multi-stage wall-mounted purifier for regular municipal or borewell supply in small to medium homes.",
    technologies: ["RO", "UV", "UF"],
    features: [
      "Multi-stage RO + UV + UF purification",
      "Wall-mounted, compact footprint",
      "Transparent storage tank",
      "Filter change indicator",
      "Suitable for daily household drinking water",
    ],
    storageCapacity: "8 L",
    waterSource: ["Municipal supply", "Borewell"],
    suitableFor: ["Families of 3-5", "Apartments", "Regular home use"],
    specifications: [
      { label: "Purification", value: "RO + UV + UF" },
      { label: "Storage capacity", value: "8 L" },
      { label: "Mounting", value: "Wall mounted / counter top" },
      { label: "Recommended input TDS", value: "Up to 2000 ppm" },
      { label: "Power", value: "Standard household power supply" },
      { label: "Body material", value: "Food-grade ABS plastic" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
    featured: true,
  },
  {
    id: 2,
    category: RO,
    name: "Aqua Home Plus RO + UV + Mineral Guard",
    model: "DEMO-RO-102",
    slug: "aqua-home-plus-ro-uv-mineral",
    image: "/images/products/ro/ro-wall-mount.svg",
    shortDescription:
      "RO purification with a mineral stage that adds back essential minerals after filtration.",
    technologies: ["RO", "UV", "Mineral"],
    features: [
      "RO + UV purification with mineral cartridge",
      "Balanced taste profile after purification",
      "Child-safe tap lock",
      "Easy front-access filter service",
    ],
    storageCapacity: "9 L",
    waterSource: ["Municipal supply", "Borewell", "Tanker water"],
    suitableFor: ["Families of 4-6", "Independent houses"],
    specifications: [
      { label: "Purification", value: "RO + UV + Mineral cartridge" },
      { label: "Storage capacity", value: "9 L" },
      { label: "Mounting", value: "Wall mounted" },
      { label: "Recommended input TDS", value: "Up to 2000 ppm" },
      { label: "Filter stages", value: "6 stage (demo)" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
    featured: true,
  },
  {
    id: 3,
    category: RO,
    name: "Aqua Copper RO Water Purifier",
    model: "DEMO-RO-103",
    slug: "aqua-copper-ro",
    image: "/images/products/ro/ro-copper.svg",
    shortDescription:
      "RO purifier with a copper cartridge stage for households that prefer copper-enriched water.",
    technologies: ["RO", "UV", "Copper"],
    features: [
      "Copper cartridge stage",
      "RO + UV purification",
      "Premium finish suited to modern kitchens",
      "Separate normal / copper water dispensing (demo feature)",
    ],
    storageCapacity: "8 L",
    waterSource: ["Municipal supply", "Borewell"],
    suitableFor: ["Families of 3-5", "Kitchens with limited counter space"],
    specifications: [
      { label: "Purification", value: "RO + UV + Copper" },
      { label: "Storage capacity", value: "8 L" },
      { label: "Mounting", value: "Wall mounted" },
      { label: "Recommended input TDS", value: "Up to 2000 ppm" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
    featured: true,
  },
  {
    id: 4,
    category: RO,
    name: "Aqua Compact RO Purifier",
    model: "DEMO-RO-104",
    slug: "aqua-compact-ro",
    image: "/images/products/ro/ro-counter-top.svg",
    shortDescription:
      "A space-saving purifier for smaller kitchens, couples and compact apartments.",
    technologies: ["RO", "UF"],
    features: [
      "Slim, space-saving cabinet",
      "RO + UF purification",
      "Low maintenance design",
      "Quiet operation",
    ],
    storageCapacity: "6 L",
    waterSource: ["Municipal supply"],
    suitableFor: ["1-3 members", "Small kitchens", "Rented homes"],
    specifications: [
      { label: "Purification", value: "RO + UF" },
      { label: "Storage capacity", value: "6 L" },
      { label: "Mounting", value: "Counter top / wall mounted" },
      { label: "Recommended input TDS", value: "Up to 1500 ppm" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
  },
  {
    id: 5,
    category: RO,
    name: "Aqua Max High TDS RO Purifier",
    model: "DEMO-RO-105",
    slug: "aqua-max-high-tds-ro",
    image: "/images/products/ro/ro-wall-mount.svg",
    shortDescription:
      "Built for higher TDS borewell water where standard purifiers may struggle.",
    technologies: ["RO", "UV", "UF", "TDS Controller"],
    features: [
      "Designed for higher TDS input water",
      "Adjustable TDS controller",
      "RO + UV + UF stages",
      "Heavy-duty pump (demo specification)",
    ],
    storageCapacity: "10 L",
    waterSource: ["Borewell", "Hard water supply", "Tanker water"],
    suitableFor: ["High TDS areas", "Families of 4-6"],
    specifications: [
      { label: "Purification", value: "RO + UV + UF + TDS controller" },
      { label: "Storage capacity", value: "10 L" },
      { label: "Recommended input TDS", value: "Up to 3000 ppm" },
      { label: "Mounting", value: "Wall mounted" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
    featured: true,
  },
  {
    id: 6,
    category: RO,
    name: "Aqua Under-Sink RO Purifier",
    model: "DEMO-RO-106",
    slug: "aqua-under-sink-ro",
    image: "/images/products/ro/ro-under-sink.svg",
    shortDescription:
      "Hidden under-counter installation with a separate dispensing faucet on the sink.",
    technologies: ["RO", "UV"],
    features: [
      "Installed inside the kitchen cabinet",
      "Dedicated drinking water faucet",
      "Frees up counter and wall space",
      "Serviceable without removing the unit (demo feature)",
    ],
    storageCapacity: "8 L (external tank)",
    waterSource: ["Municipal supply", "Borewell"],
    suitableFor: ["Modular kitchens", "Families of 4-6"],
    specifications: [
      { label: "Purification", value: "RO + UV" },
      { label: "Installation", value: "Under-sink / under-counter" },
      { label: "Storage capacity", value: "8 L external tank" },
      { label: "Faucet", value: "Separate drinking water faucet included" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
  },
  {
    id: 7,
    category: RO,
    name: "Aqua Family RO + UV Purifier",
    model: "DEMO-RO-107",
    slug: "aqua-family-ro-uv",
    image: "/images/products/ro/ro-wall-mount.svg",
    shortDescription:
      "Larger storage for joint families and homes with frequent guests.",
    technologies: ["RO", "UV", "UF", "Mineral"],
    features: [
      "Large storage tank",
      "Four-stage purification path",
      "Auto shut-off when the tank is full",
      "Suitable for continuous daily use",
    ],
    storageCapacity: "12 L",
    waterSource: ["Municipal supply", "Borewell"],
    suitableFor: ["Joint families", "6+ members", "Homes with guests"],
    specifications: [
      { label: "Purification", value: "RO + UV + UF + Mineral" },
      { label: "Storage capacity", value: "12 L" },
      { label: "Mounting", value: "Wall mounted" },
      { label: "Recommended input TDS", value: "Up to 2000 ppm" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
  },
  {
    id: 8,
    category: RO,
    name: "Aqua Smart RO with Digital Display",
    model: "DEMO-RO-108",
    slug: "aqua-smart-ro-digital",
    image: "/images/products/ro/ro-counter-top.svg",
    shortDescription:
      "Digital display purifier showing purification status and filter life at a glance.",
    technologies: ["RO", "UV", "UF"],
    features: [
      "Digital status display",
      "Filter life indication",
      "Soft-touch dispensing",
      "Modern kitchen aesthetic",
    ],
    storageCapacity: "8 L",
    waterSource: ["Municipal supply", "Borewell"],
    suitableFor: ["Families of 3-5", "Modern kitchens"],
    specifications: [
      { label: "Purification", value: "RO + UV + UF" },
      { label: "Display", value: "Digital status panel" },
      { label: "Storage capacity", value: "8 L" },
      { label: "Mounting", value: "Wall mounted / counter top" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
  },
  {
    id: 9,
    category: RO,
    name: "Aqua Alkaline RO Purifier",
    model: "DEMO-RO-109",
    slug: "aqua-alkaline-ro",
    image: "/images/products/ro/ro-wall-mount.svg",
    shortDescription:
      "RO purifier with an alkaline cartridge stage, for customers who want alkaline drinking water without a full ionizer.",
    technologies: ["RO", "UV", "Alkaline cartridge"],
    features: [
      "Alkaline cartridge after the RO stage",
      "RO + UV purification",
      "An entry option before a full water ionizer",
      "Standard household installation",
    ],
    storageCapacity: "9 L",
    waterSource: ["Municipal supply", "Borewell"],
    suitableFor: ["Customers exploring alkaline water", "Families of 3-5"],
    specifications: [
      { label: "Purification", value: "RO + UV + Alkaline cartridge" },
      { label: "Storage capacity", value: "9 L" },
      { label: "Mounting", value: "Wall mounted" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
  },
  {
    id: 10,
    category: RO,
    name: "Aqua Hot & Normal RO Purifier",
    model: "DEMO-RO-110",
    slug: "aqua-hot-normal-ro",
    image: "/images/products/ro/ro-counter-top.svg",
    shortDescription:
      "Dispenses both hot and normal purified water from a single unit.",
    technologies: ["RO", "UV", "UF"],
    features: [
      "Hot and normal water dispensing",
      "Child lock on the hot water tap",
      "Multi-stage RO purification",
      "Useful for kitchens and small offices",
    ],
    storageCapacity: "7 L normal + hot tank",
    waterSource: ["Municipal supply"],
    suitableFor: ["Kitchens", "Small offices", "Families of 3-5"],
    specifications: [
      { label: "Purification", value: "RO + UV + UF" },
      { label: "Dispensing", value: "Hot and normal" },
      { label: "Storage capacity", value: "7 L (normal)" },
      { label: "Safety", value: "Hot water child lock" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
  },
  {
    id: 11,
    category: RO,
    name: "Aqua Steel Series RO Purifier",
    model: "DEMO-RO-111",
    slug: "aqua-steel-series-ro",
    image: "/images/products/ro/ro-wall-mount.svg",
    shortDescription:
      "Stainless steel bodied purifier for customers who prefer a metal finish and durable exterior.",
    technologies: ["RO", "UV", "UF"],
    features: [
      "Stainless steel outer body",
      "Scratch and stain resistant finish",
      "Multi-stage purification",
      "Long-life storage tank",
    ],
    storageCapacity: "10 L",
    waterSource: ["Municipal supply", "Borewell"],
    suitableFor: ["Families of 4-6", "Premium kitchens"],
    specifications: [
      { label: "Purification", value: "RO + UV + UF" },
      { label: "Body material", value: "Stainless steel" },
      { label: "Storage capacity", value: "10 L" },
      { label: "Mounting", value: "Wall mounted" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
  },
  {
    id: 12,
    category: RO,
    name: "Aqua Essential RO Purifier",
    model: "DEMO-RO-112",
    slug: "aqua-essential-ro",
    image: "/images/products/ro/ro-counter-top.svg",
    shortDescription:
      "A straightforward, budget-conscious RO purifier covering the essentials.",
    technologies: ["RO"],
    features: [
      "Simple RO purification",
      "Easy to operate",
      "Economical filter replacement",
      "A good first purifier for a new home",
    ],
    storageCapacity: "6 L",
    waterSource: ["Municipal supply"],
    suitableFor: ["1-4 members", "First-time buyers"],
    specifications: [
      { label: "Purification", value: "RO" },
      { label: "Storage capacity", value: "6 L" },
      { label: "Mounting", value: "Counter top / wall mounted" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
  },
  {
    id: 13,
    category: RO,
    name: "Aqua Zinc + Copper RO Purifier",
    model: "DEMO-RO-113",
    slug: "aqua-zinc-copper-ro",
    image: "/images/products/ro/ro-copper.svg",
    shortDescription:
      "RO purifier with combined copper and zinc cartridge stages.",
    technologies: ["RO", "UV", "Copper", "Zinc"],
    features: [
      "Copper and zinc cartridge stages",
      "RO + UV purification",
      "Premium front panel",
      "Suited to families who prefer enriched water",
    ],
    storageCapacity: "9 L",
    waterSource: ["Municipal supply", "Borewell"],
    suitableFor: ["Families of 4-6"],
    specifications: [
      { label: "Purification", value: "RO + UV + Copper + Zinc" },
      { label: "Storage capacity", value: "9 L" },
      { label: "Mounting", value: "Wall mounted" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
  },
  {
    id: 14,
    category: RO,
    name: "Aqua Office RO Purifier",
    model: "DEMO-RO-114",
    slug: "aqua-office-ro",
    image: "/images/products/ro/ro-commercial.svg",
    shortDescription:
      "Higher-capacity purifier for small offices, clinics and shops.",
    technologies: ["RO", "UV", "UF"],
    features: [
      "Higher purification throughput",
      "Large storage tank",
      "Floor-standing or wall-mounted installation",
      "Built for continuous daytime use",
    ],
    storageCapacity: "20 L",
    waterSource: ["Municipal supply", "Borewell"],
    suitableFor: ["Small offices", "Clinics", "Shops"],
    specifications: [
      { label: "Purification", value: "RO + UV + UF" },
      { label: "Storage capacity", value: "20 L" },
      { label: "Installation", value: "Floor standing / wall mounted" },
      { label: "Usage", value: "Light commercial (demo specification)" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
  },
  {
    id: 15,
    category: RO,
    name: "Aqua Commercial RO Plant 25 LPH",
    model: "DEMO-RO-115",
    slug: "aqua-commercial-ro-25lph",
    image: "/images/products/ro/ro-commercial.svg",
    shortDescription:
      "A commercial RO plant for canteens, hostels and larger premises.",
    technologies: ["RO", "UV", "Pre-filtration"],
    features: [
      "25 litres per hour output (demo specification)",
      "Industrial grade pre-filtration",
      "Site survey recommended before installation",
      "Annual maintenance can be arranged",
    ],
    storageCapacity: "Depends on site tank",
    waterSource: ["Borewell", "Municipal supply", "Bulk storage"],
    suitableFor: ["Canteens", "Hostels", "Small commercial premises"],
    specifications: [
      { label: "Purification", value: "RO + UV with pre-filtration" },
      { label: "Output", value: "25 LPH (demo specification)" },
      { label: "Installation", value: "Site survey required" },
      { label: "Maintenance", value: "Periodic service recommended" },
    ],
    warranty: "Warranty as per installation agreement (demo value)",
  },
  {
    id: 16,
    category: RO,
    name: "Aqua Gravity Non-Electric Purifier",
    model: "DEMO-RO-116",
    slug: "aqua-gravity-non-electric",
    image: "/images/products/ro/ro-counter-top.svg",
    shortDescription:
      "A non-electric gravity purifier for low TDS supply or as a backup during power cuts.",
    technologies: ["UF", "Activated carbon"],
    features: [
      "Works without electricity",
      "Portable and easy to clean",
      "Useful as a backup unit",
      "Suitable only for low TDS water",
    ],
    storageCapacity: "16 L",
    waterSource: ["Low TDS municipal supply"],
    suitableFor: ["Backup use", "Low TDS areas", "Small households"],
    specifications: [
      { label: "Purification", value: "UF + activated carbon" },
      { label: "Power", value: "Not required" },
      { label: "Storage capacity", value: "16 L" },
      { label: "Note", value: "Not suitable for high TDS water" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
  },
  {
    id: 17,
    category: RO,
    name: "Aqua Pro RO + UV + UF + Mineral",
    model: "DEMO-RO-117",
    slug: "aqua-pro-ro-uv-uf-mineral",
    image: "/images/products/ro/ro-wall-mount.svg",
    shortDescription:
      "A fully loaded multi-stage purifier for demanding water conditions.",
    technologies: ["RO", "UV", "UF", "Mineral", "TDS Controller"],
    features: [
      "Complete multi-stage purification path",
      "TDS controller for taste balance",
      "Large storage tank",
      "Filter change indicator",
    ],
    storageCapacity: "12 L",
    waterSource: ["Borewell", "Municipal supply", "Tanker water"],
    suitableFor: ["Families of 5-7", "Mixed water sources"],
    specifications: [
      {
        label: "Purification",
        value: "RO + UV + UF + Mineral + TDS controller",
      },
      { label: "Storage capacity", value: "12 L" },
      { label: "Recommended input TDS", value: "Up to 2500 ppm" },
      { label: "Mounting", value: "Wall mounted" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
    featured: true,
  },
  {
    id: 18,
    category: RO,
    name: "Aqua Slim Wall-Mount RO Purifier",
    model: "DEMO-RO-118",
    slug: "aqua-slim-wall-mount-ro",
    image: "/images/products/ro/ro-wall-mount.svg",
    shortDescription:
      "A narrow-profile purifier that fits into tight wall spaces without losing storage.",
    technologies: ["RO", "UV"],
    features: [
      "Narrow wall footprint",
      "RO + UV purification",
      "Quiet pump operation",
      "Easy filter access from the front",
    ],
    storageCapacity: "7 L",
    waterSource: ["Municipal supply"],
    suitableFor: ["Compact kitchens", "Families of 2-4"],
    specifications: [
      { label: "Purification", value: "RO + UV" },
      { label: "Storage capacity", value: "7 L" },
      { label: "Mounting", value: "Wall mounted" },
    ],
    warranty: "1 year warranty (demo value - confirm with Tejas Agency)",
  },
];

const alkalineProducts = [
  {
    id: 101,
    category: ALKALINE,
    name: "LifeCore Alkaline Water Ionizer - Counter Top",
    model: "DEMO-LC-200",
    slug: "lifecore-counter-top-ionizer",
    image: "/images/products/lifecore/ionizer-counter-top.svg",
    shortDescription:
      "A counter-top LifeCore water ionizer with selectable pH levels and a touch control panel.",
    technologies: [
      "Electrolysis",
      "Multi-plate electrodes",
      "Inline filtration",
    ],
    features: [
      "Selectable alkaline and acidic water levels",
      "Touch control panel with a clear display",
      "Multi-plate electrode chamber",
      "Inline filter with replacement indication",
      "Counter-top installation next to the kitchen tap",
    ],
    functions: [
      "Alkaline water settings",
      "Purified / neutral water setting",
      "Acidic water settings",
      "Filter status indication",
      "Automatic plate cleaning cycle",
    ],
    ionization: {
      summary:
        "The ionizer passes filtered water across electrode plates. Electrolysis separates the water into an alkaline stream and an acidic stream, and you select the level you want from the control panel.",
      points: [
        "Incoming water is filtered before it reaches the electrode chamber",
        "Electrolysis separates the water into alkaline and acidic streams",
        "The selected level is shown on the display panel",
        "The acidic stream is drained through a separate outlet",
      ],
      note: "Tejas Agency presents product functions and specifications only. We do not make health or medical claims about ionized water - please consult a qualified professional for health related questions.",
    },
    specifications: [
      { label: "Type", value: "Counter-top alkaline water ionizer" },
      { label: "Electrode plates", value: "Multi-plate (demo specification)" },
      { label: "Control", value: "Touch panel with display" },
      { label: "Level selection", value: "Multiple alkaline and acidic levels" },
      { label: "Filtration", value: "Inline replaceable filter" },
      { label: "Power", value: "Standard household power supply" },
      {
        label: "Installation",
        value: "Connects to the kitchen tap / inlet line",
      },
    ],
    installation:
      "Installed on the kitchen counter with a connection to the incoming water line and a drain outlet for the acidic stream. Tejas Agency arranges installation and explains the control panel before handover.",
    suitableFor: [
      "Customers who want selectable water levels",
      "Modern kitchens with counter space",
      "Households upgrading from a standard purifier",
    ],
    warranty:
      "Warranty as per LifeCore terms (demo value - confirm with Tejas Agency)",
    featured: true,
  },
  {
    id: 102,
    category: ALKALINE,
    name: "LifeCore Alkaline Water Ionizer - Under Counter",
    model: "DEMO-LC-300",
    slug: "lifecore-under-counter-ionizer",
    image: "/images/products/lifecore/ionizer-under-counter.svg",
    shortDescription:
      "An under-counter LifeCore ionizer with a separate dispenser, keeping the kitchen counter clear.",
    technologies: [
      "Electrolysis",
      "Multi-plate electrodes",
      "Inline filtration",
    ],
    features: [
      "Main unit installed inside the cabinet",
      "Separate control dispenser on the counter",
      "Selectable alkaline and acidic levels",
      "Keeps the working counter clear",
      "Suited to modular kitchens",
    ],
    functions: [
      "Alkaline water settings",
      "Purified / neutral water setting",
      "Acidic water settings",
      "Remote dispenser control",
      "Filter replacement indication",
    ],
    ionization: {
      summary:
        "The under-counter unit performs the same electrolysis process as the counter-top model, with the electrode chamber hidden inside the cabinet and a slim dispenser above the sink.",
      points: [
        "Filtered water enters the electrode chamber inside the cabinet",
        "Electrolysis produces alkaline and acidic streams",
        "The counter dispenser selects and delivers the chosen level",
        "The acidic stream is routed to the drain line",
      ],
      note: "Product functions and specifications only. Tejas Agency does not make health or medical claims about ionized water.",
    },
    specifications: [
      { label: "Type", value: "Under-counter alkaline water ionizer" },
      { label: "Electrode plates", value: "Multi-plate (demo specification)" },
      { label: "Control", value: "Counter-top dispenser with display" },
      { label: "Level selection", value: "Multiple alkaline and acidic levels" },
      { label: "Filtration", value: "Inline replaceable filter" },
      {
        label: "Installation",
        value: "Under-sink cabinet with drain connection",
      },
    ],
    installation:
      "Requires cabinet space under the sink, an inlet connection and a drain outlet. A site check is recommended before installation. Tejas Agency handles the installation and demonstration.",
    suitableFor: [
      "Modular kitchens",
      "Customers who want the unit out of sight",
      "Homes with under-sink space available",
    ],
    warranty:
      "Warranty as per LifeCore terms (demo value - confirm with Tejas Agency)",
    featured: true,
  },
  {
    id: 103,
    category: ALKALINE,
    name: "LifeCore Portable Alkaline Water Ionizer",
    model: "DEMO-LC-100",
    slug: "lifecore-portable-ionizer",
    image: "/images/products/lifecore/ionizer-portable.svg",
    shortDescription:
      "A compact LifeCore ionizer for smaller kitchens or customers who want a simpler entry model.",
    technologies: [
      "Electrolysis",
      "Compact electrode chamber",
      "Inline filtration",
    ],
    features: [
      "Compact footprint",
      "Simple level selection",
      "Plug-in installation with a tap connector",
      "Easy to move if you shift homes",
    ],
    functions: [
      "Alkaline water settings",
      "Purified / neutral water setting",
      "Acidic water setting",
      "Filter status indication",
    ],
    ionization: {
      summary:
        "A compact electrode chamber performs the same electrolysis process at a smaller scale, with a simplified set of selectable levels.",
      points: [
        "Connects to the kitchen tap with a supplied connector",
        "Filtered water passes through the electrode chamber",
        "Alkaline and acidic streams are delivered separately",
      ],
      note: "Product functions and specifications only. Tejas Agency does not make health or medical claims about ionized water.",
    },
    specifications: [
      { label: "Type", value: "Compact / portable alkaline water ionizer" },
      {
        label: "Electrode plates",
        value: "Compact chamber (demo specification)",
      },
      { label: "Control", value: "Panel with level selection" },
      { label: "Filtration", value: "Inline replaceable filter" },
      { label: "Installation", value: "Tap connector - no cabinet work needed" },
    ],
    installation:
      "Connects directly to a standard kitchen tap using the supplied connector. Tejas Agency demonstrates setup and filter replacement at handover.",
    suitableFor: [
      "Small kitchens",
      "Rented homes",
      "Customers trying a water ionizer for the first time",
    ],
    warranty:
      "Warranty as per LifeCore terms (demo value - confirm with Tejas Agency)",
  },
];

export const products = [...roProducts, ...alkalineProducts].map(withDefaults);

export default products;
