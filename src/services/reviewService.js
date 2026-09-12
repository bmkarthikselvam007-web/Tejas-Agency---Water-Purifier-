/**
 * REVIEW SERVICE
 * Currently returns clearly flagged demo reviews. Replace with the real
 * source (Google reviews export or backend API) when available.
 */

import reviews, { reviewFilters } from "../data/reviews";
import { average, delay } from "../utils/helpers";

export async function getReviews({ topic = "all", limit } = {}) {
  await delay(150);
  const filtered =
    topic === "all" ? reviews : reviews.filter((item) => item.topic === topic);
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export async function getReviewSummary() {
  await delay(120);
  return {
    total: reviews.length,
    averageRating: Number(average(reviews.map((r) => r.rating)).toFixed(1)),
    isDemoData: reviews.some((review) => review.isDemoData),
  };
}

export function getReviewFilters() {
  return reviewFilters;
}
