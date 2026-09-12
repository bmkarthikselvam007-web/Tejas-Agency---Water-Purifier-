/** Small, dependency free helpers shared across the app. */

/** Simulated async boundary so components are already written for real API latency. */
export const delay = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const average = (numbers = []) =>
  numbers.length
    ? numbers.reduce((sum, value) => sum + value, 0) / numbers.length
    : 0;

export const classNames = (...values) => values.filter(Boolean).join(" ");
