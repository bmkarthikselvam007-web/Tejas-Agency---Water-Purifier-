/**
 * PRODUCT SERVICE
 * ---------------------------------------------------------------------------
 * The only place in the app that knows where product data comes from.
 * Today it resolves from the local mock dataset; when the backend exists,
 * replace the bodies of these functions with API calls (for example
 * `const res = await fetch(`${API_URL}/products`)`). The signatures and the
 * returned shapes must stay the same so no component needs to change.
 * ---------------------------------------------------------------------------
 */

import products from "../data/products";
import { PRODUCT_CATEGORY_KEYS } from "../data/categories";
import { delay } from "../utils/helpers";

/** Simulated network latency so loading states are exercised during the demo. */
const LATENCY_MS = 180;

const activeProducts = () => products.filter((product) => product.active);

export async function getProducts() {
  await delay(LATENCY_MS);
  return activeProducts();
}

export async function getProductsByCategory(categoryKey) {
  await delay(LATENCY_MS);
  return activeProducts().filter((product) => product.category === categoryKey);
}

export async function getProductBySlug(slug) {
  await delay(LATENCY_MS);
  return activeProducts().find((product) => product.slug === slug) ?? null;
}

/**
 * Slug lookup scoped to a category, so a RO slug cannot be opened under the
 * alkaline route (and vice versa).
 */
export async function getProductBySlugInCategory(categoryKey, slug) {
  await delay(LATENCY_MS);
  return (
    activeProducts().find(
      (product) => product.slug === slug && product.category === categoryKey,
    ) ?? null
  );
}

export async function getFeaturedProducts(limit = 6) {
  await delay(LATENCY_MS);
  const featured = activeProducts().filter((product) => product.featured);
  const ro = featured.filter((p) => p.category === PRODUCT_CATEGORY_KEYS.RO);
  const alkaline = featured.filter(
    (p) => p.category === PRODUCT_CATEGORY_KEYS.ALKALINE,
  );

  // Show both categories on the homepage rather than only the first few RO units.
  const mixed = [];
  const maxLength = Math.max(ro.length, alkaline.length);
  for (let i = 0; i < maxLength; i += 1) {
    if (ro[i]) mixed.push(ro[i]);
    if (alkaline[i]) mixed.push(alkaline[i]);
  }
  return mixed.slice(0, limit);
}

export async function getRelatedProducts(product, limit = 3) {
  await delay(LATENCY_MS);
  if (!product) return [];
  return activeProducts()
    .filter(
      (item) =>
        item.category === product.category && item.slug !== product.slug,
    )
    .slice(0, limit);
}

/**
 * Filter options derived from the data itself, so new products automatically
 * appear in the filter UI without a code change.
 */
export async function getProductFilterOptions(categoryKey) {
  await delay(0);
  const scoped = activeProducts().filter(
    (product) => product.category === categoryKey,
  );
  const technologies = new Set();
  const sources = new Set();
  scoped.forEach((product) => {
    (product.technologies ?? []).forEach((tech) => technologies.add(tech));
    (product.waterSource ?? []).forEach((source) => sources.add(source));
  });
  return {
    technologies: Array.from(technologies).sort(),
    waterSources: Array.from(sources).sort(),
  };
}
