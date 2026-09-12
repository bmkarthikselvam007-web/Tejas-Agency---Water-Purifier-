# Tejas Agency — Frontend (Version 1 prototype)

Marketing and product-showcase website for **Tejas Agency**, a water purification
business in **Madurai, Tamil Nadu**, selling RO water purifiers and LifeCore
alkaline water ionizers, with installation and RO service support.

> **Backend is intentionally not implemented in this Version 1 frontend prototype.**
> Everything on the site is driven by local mock data through a service layer, so
> the backend can be connected later without rebuilding the UI. The contact form
> validates in the browser and does **not** send data anywhere.

---

## Tech stack

| Area       | Choice                                  |
| ---------- | --------------------------------------- |
| Framework  | React 19                                |
| Build tool | Vite 8                                  |
| Language   | JavaScript + JSX                        |
| Routing    | React Router 7                          |
| Styling    | Plain CSS with a CSS-variable design system (no UI framework) |
| Linting    | oxlint                                  |

No component library, icon package or animation library is used — icons are a
small inline SVG set and animations are plain CSS transitions.

---

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173

Other commands:

```bash
npm run build
```

```bash
npm run preview
```

```bash
npm run lint
```

---

## Routes

| Route                                          | Page                                         |
| ---------------------------------------------- | -------------------------------------------- |
| `/`                                            | Homepage                                     |
| `/products`                                    | Category gateway (not a full product list)   |
| `/products/ro-water-purifiers`                 | RO purifier catalogue with filters           |
| `/products/ro-water-purifiers/:slug`           | RO product detail                            |
| `/products/alkaline-water-ionizers`            | LifeCore ionizer catalogue                   |
| `/products/alkaline-water-ionizers/:slug`      | LifeCore product detail                      |
| `/ro-service-madurai`                          | RO service & repair                          |
| `/about-us`                                    | About Tejas Agency                           |
| `/reviews`                                     | Customer reviews (demo data)                 |
| `/faq`                                         | FAQs with category filter                    |
| `/contact`                                     | Contact details, map area, enquiry form      |
| `/privacy-policy`, `/terms-and-conditions`     | Legal placeholders                           |
| anything else                                  | 404 page                                     |

An unknown product slug (or a slug opened under the wrong category) shows a
"product not found" state rather than crashing.

---

## Folder structure

```
public/
  favicon/                  favicon.png (cropped from the brand logo)
  images/
    branding/               logo.png (the supplied logo), hero illustration, OG image
    products/ro/            RO purifier illustrations
    products/lifecore/      ionizer illustrations
    service/ store/         service and shop illustrations

src/
  components/
    common/                 Button, Icon, Accordion, Breadcrumbs, Rating,
                            PageHero, SectionHeading, DemoNotice, States
                            (skeletons / empty / error), ContactButtons
    layout/                 Header, Footer, Layout, MobileStickyCTA
    navigation/             DesktopNav (dropdown), MobileNav (drawer)
    products/               ProductCard, ProductGrid, ProductFilters,
                            ProductGallery, ProductDetailParts, CategoryCard,
                            RelatedProducts
    services/ reviews/ faq/ forms/   section-level components
    home/                   Hero + all homepage sections
  pages/                    One folder per route
  data/                     MOCK DATA (products, categories, reviews, faqs, services)
  services/                 Service layer — the only place that knows where data comes from
  config/                   business.js (contact details), navigation.js (routes/menus)
  hooks/                    useAsyncData, useDocumentMeta, useLockBodyScroll, useScrollPosition
  styles/                   variables.css (design tokens), globals.css
  App.jsx                   Routing
  main.jsx                  Entry point
```

---

## Where to replace placeholder information

### 1. Business information — `src/config/business.js`

This is the **only** file with contact details. Phone numbers, WhatsApp numbers
and map URLs are never hardcoded anywhere else.

| Field                     | Replace with                                        |
| ------------------------- | --------------------------------------------------- |
| `phone`                   | Phone number, digits only with country code (`919876543210`) |
| `whatsapp`                | WhatsApp number, same format                        |
| `email`                   | Business email                                      |
| `address`, `addressLines` | Shop address                                        |
| `businessHours`, `businessHoursDetail` | Opening hours                          |
| `mapsUrl`                 | Google Maps share link ("Open in Google Maps" button) |
| `mapsEmbedUrl`            | Google Maps **embed** URL — the map replaces the placeholder automatically |
| `googleReviewUrl`         | Google Business Profile URL — the Reviews page "Read Google Reviews" button |
| `googleWriteReviewUrl`    | Google "write a review" URL — the "Write a Review" button |
| `social.instagram`        | Already set to the real account: `https://www.instagram.com/tejasagencymadurai/` |
| `siteUrl`                 | Final domain (used for canonical + Open Graph URLs) |
| `social`                  | Only real, verified accounts — leave empty otherwise |

While a value still reads `REPLACE_WITH_…` or `[Something]`, the UI degrades
gracefully: Call/WhatsApp buttons stay real buttons and explain what is missing
instead of producing a broken link. As soon as the numbers are filled in, every
CTA on the site becomes a working link.

### 2. WhatsApp messages — `src/utils/whatsapp.js`

Message templates per context (RO product, ionizer product, service, expert
advice, enquiry). The number itself comes from `business.js`.

### 3. Products — `src/data/products.js`

All 18 RO purifiers and 3 LifeCore ionizers are **demo records**. Replace names,
models, slugs, images, descriptions, features, specifications, warranty and
price with the real catalogue. Product shape:

```js
{
  id, category, name, model, slug, image, gallery: [],
  shortDescription, technologies: [], features: [],
  specifications: [{ label, value }], suitableFor: [],
  storageCapacity, waterSource: [], warranty,
  price: null, priceDisplay: "Contact for Price",
  featured, active, isDemoData
}
```

Ionizer records additionally carry `functions`, `ionization` and `installation`;
the product page renders whichever fields exist, so RO-only fields are never
forced onto an ionizer.

Setting `active: false` removes a product from the site; `featured: true` puts it
on the homepage. `isDemoData: true` is what makes the visible "demo content"
notice appear — remove it once the real data is in.

### 4. Categories — `src/data/categories.js`

Two categories today. Adding a third is a data change plus a route.

### 5. Reviews — `src/data/reviews.js`

Currently **clearly marked placeholder reviews** — they are not presented as
genuine customer feedback anywhere. Replace with real reviews and set
`isDemoData: false` to remove the demo banners and the "DEMO DATA" chips.

### 6. FAQs — `src/data/faqs.js`

`showOnHome: true` controls which questions appear on the homepage.

### 7. Services — `src/data/services.js`

Only the services listed here are described anywhere on the site. Remove an
entry and it disappears from every page.

### 8. Images — `public/images/`

`branding/logo.png` is the **real Tejas Agency logo** (cropped from the supplied
file), and `favicon/favicon.png` is the wave mark taken from it. Everything else
is generated SVG placeholder illustration — no external image URLs, nothing
copyrighted. Replace the product and store artwork with real photographs using
the same paths (or update the paths in `products.js` / `categories.js`).

The placeholder illustrations are produced by a small generator script kept
outside the repo; editing the SVGs in `public/images/` directly is fine, since
they are ordinary files.

---

## Colour theme

Defined once in `src/styles/variables.css`. Nothing else in the codebase should
introduce a new colour.

| Role                  | Token                         | Value     | Used for |
| --------------------- | ----------------------------- | --------- | -------- |
| Primary (water)       | `--color-primary`             | `#0d7d92` | Links, primary buttons, icons — deep enough to stay readable on white |
| Primary highlight     | `--color-primary-bright`      | `#22bedc` | Turquoise accents on dark surfaces only |
| Deep navy (trust)     | `--color-navy`                | `#0a2540` | Footer, dark heroes, final CTA, headings |
| Secondary accent      | `--color-accent`              | `#6f54bd` | The ionizer / LifeCore range |
| Brand highlight       | `--color-brand`               | `#d9822b` | The logo orange — used sparingly (demo notices, highlights) |
| Surfaces              | `--color-surface-soft`        | `#f5fafc` | Alternating section backgrounds (light cyan wash) |

Every text colour was checked against the surface it sits on: body copy is at
least 5.6:1 on white, the eyebrow label is 4.8:1, and text on navy is 9.9:1 or
better. On dark sections the eyebrow automatically switches to the bright cyan.

---

## How the future backend integration works

Components never import data files directly — they call the service layer:

```
Today:    Component → hook (useAsyncData) → service → src/data/*.js
Later:    Component → hook (useAsyncData) → service → Backend API → Database
```

`src/services/` already exposes async functions with the signatures the backend
will need:

| Service              | Functions                                                                     |
| -------------------- | ----------------------------------------------------------------------------- |
| `productService`     | `getProducts`, `getProductsByCategory`, `getProductBySlug`, `getProductBySlugInCategory`, `getFeaturedProducts`, `getRelatedProducts`, `getProductFilterOptions` |
| `categoryService`    | `getCategories`, `getCategoryBySlug`                                           |
| `reviewService`      | `getReviews`, `getReviewSummary`                                               |
| `faqService`         | `getFaqs`, `getHomeFaqs`, `getFaqsByCategory`                                  |
| `serviceService`     | `getServices`, `getServiceProcess`                                             |
| `enquiryService`     | `submitEnquiry`                                                                |

To connect a backend, replace the body of each function with a `fetch` call and
keep the return shape. Nothing in `src/components` or `src/pages` needs to
change. Every one of these already resolves asynchronously (with a small
simulated latency), so loading skeletons and error states are exercised today.

`enquiryService.submitEnquiry()` contains the exact `fetch` call to drop in when
the enquiry endpoint exists.

The data shapes are also designed for the future admin panel: products,
categories, FAQs and reviews all carry `id`, ordering/flags (`active`,
`featured`, `order`) and a price field, so CRUD can be added without reshaping
the frontend.

---

## Things that were deliberately **not** invented

Nothing on the site claims anything the business has not supplied:

- no customer counts, years of experience, awards or certifications
- no fake reviews presented as genuine (demo reviews are labelled as demo)
- no health or medical claims about alkaline / ionized water — only product
  functions and specifications
- no copied manufacturer specifications; demo specs are labelled as demo
- no invented phone numbers, addresses or social accounts

---

## Accessibility & SEO notes

- Semantic HTML, one `<h1>` per page, logical heading order
- Real `<button>` / `<a>` elements — no clickable `<div>`s
- Labelled form fields, `aria-invalid` + linked error messages
- Keyboard-accessible dropdown and drawer (Escape closes, focus is visible)
- Skip link to main content
- Alt text on meaningful images; decorative images are `aria-hidden`
- Per-page `<title>`, meta description, canonical URL and Open Graph tags via
  `useDocumentMeta` — client-side today, ready to be swapped for pre-rendering
  or SSR at deployment time
- Breadcrumbs on every inner page
- The Instagram CTA in the header is icon-only with an accessible label naming
  the handle

Because this is a client-rendered SPA, the deployment host must serve
`index.html` for all routes (SPA fallback), and pre-rendering should be
considered when SEO becomes a priority.

---

## Responsive behaviour

Tested from 360px through 1920px. Key breakpoints: 640 / 768 / 1024 / 1180.

- ≤768px: mobile layout, fixed WhatsApp + Call bar at the bottom (page padding
  is reserved for it so it never covers content)
- ≤1024px: hamburger drawer replaces the desktop navigation
- ≤1180px: the header Call button is dropped so the navigation never wraps
- Wide content (specification tables) scrolls inside its own container; the page
  itself never scrolls horizontally
