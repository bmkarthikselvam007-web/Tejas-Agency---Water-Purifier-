/**
 * FAQ SERVICE
 * Swap the bodies for API calls when the backend is available.
 */

import faqs, { faqCategories } from "../data/faqs";
import { delay } from "../utils/helpers";

export async function getFaqs({ category = "all", limit } = {}) {
  await delay(120);
  const filtered =
    category === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === category);
  return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
}

export async function getHomeFaqs(limit = 6) {
  await delay(120);
  return faqs.filter((faq) => faq.showOnHome).slice(0, limit);
}

export async function getFaqsByCategory(category, limit) {
  return getFaqs({ category, limit });
}

export function getFaqCategories() {
  return faqCategories;
}
