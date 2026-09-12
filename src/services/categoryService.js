/**
 * CATEGORY SERVICE
 * Swap the bodies for API calls when the backend is available.
 */

import categories from "../data/categories";
import { delay } from "../utils/helpers";

const activeCategories = () =>
  categories
    .filter((category) => category.active)
    .sort((a, b) => a.order - b.order);

export async function getCategories() {
  await delay(120);
  return activeCategories();
}

export async function getCategoryBySlug(slug) {
  await delay(120);
  return activeCategories().find((category) => category.slug === slug) ?? null;
}

/** Synchronous lookup for places that only need static labels (breadcrumbs, nav). */
export function findCategoryBySlugSync(slug) {
  return categories.find((category) => category.slug === slug) ?? null;
}

export function findCategoryByProductKeySync(productKey) {
  return categories.find((category) => category.productKey === productKey) ?? null;
}
