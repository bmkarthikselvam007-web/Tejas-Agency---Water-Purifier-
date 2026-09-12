/**
 * Single source of truth for site navigation.
 * Header, mobile drawer and footer all read from here.
 */

export const ROUTES = {
  home: "/",
  products: "/products",
  roProducts: "/products/ro-water-purifiers",
  alkalineProducts: "/products/alkaline-water-ionizers",
  service: "/ro-service-madurai",
  about: "/about-us",
  reviews: "/reviews",
  faq: "/faq",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
};

export const mainNavigation = [
  { label: "Home", to: ROUTES.home },
  {
    label: "Products",
    to: ROUTES.products,
    children: [
      {
        label: "RO Water Purifiers",
        to: ROUTES.roProducts,
        description: "Home purifiers for everyday drinking water",
      },
      {
        label: "Alkaline Water Ionizers",
        to: ROUTES.alkalineProducts,
        description: "LifeCore ionizer range",
      },
    ],
  },
  { label: "RO Service", to: ROUTES.service },
  { label: "About Us", to: ROUTES.about },
  { label: "Reviews", to: ROUTES.reviews },
  { label: "FAQ", to: ROUTES.faq },
  { label: "Contact", to: ROUTES.contact },
];

export const footerNavigation = [
  { label: "Home", to: ROUTES.home },
  { label: "Products", to: ROUTES.products },
  { label: "RO Water Purifiers", to: ROUTES.roProducts },
  { label: "Alkaline Water Ionizers", to: ROUTES.alkalineProducts },
  { label: "RO Service", to: ROUTES.service },
  { label: "About Us", to: ROUTES.about },
  { label: "Reviews", to: ROUTES.reviews },
  { label: "FAQ", to: ROUTES.faq },
  { label: "Contact", to: ROUTES.contact },
];

export const legalNavigation = [
  { label: "Privacy Policy", to: ROUTES.privacy },
  { label: "Terms & Conditions", to: ROUTES.terms },
];

export default mainNavigation;
