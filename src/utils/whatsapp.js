import { businessConfig, isPlaceholder } from "../config/business";
import { normalizePhone } from "./phone";

const BASE_URL = "https://wa.me";

/** Ready-made, context aware enquiry messages. */
export const whatsappMessages = {
  general: () =>
    `Hi ${businessConfig.name}, I would like to know more about your water purification products and services.`,

  roProduct: (productName) =>
    `Hi ${businessConfig.name}, I'm interested in ${productName}. Please share the price and details.`,

  alkalineProduct: (productName) =>
    `Hi ${businessConfig.name}, I'm interested in ${productName}. Please share the details and price.`,

  category: (categoryName) =>
    `Hi ${businessConfig.name}, I would like guidance on choosing a ${categoryName}. Please help me with the available options.`,

  service: () =>
    `Hi ${businessConfig.name}, I need RO service/repair in ${businessConfig.city}. Please share the details.`,

  installation: () =>
    `Hi ${businessConfig.name}, I need RO installation in ${businessConfig.city}. Please share the details.`,

  expertAdvice: () =>
    `Hi ${businessConfig.name}, I need help choosing the right water purification solution for my home. Please guide me.`,

  enquiry: ({ name, phone, requirement, message }) =>
    [
      `Hi ${businessConfig.name}, I would like to make an enquiry.`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Requirement: ${requirement}`,
      message ? `Message: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
};

/**
 * Build a wa.me link for the configured business number.
 * Returns null while the WhatsApp number is still a placeholder.
 */
export const getWhatsAppLink = (message = whatsappMessages.general()) => {
  if (isPlaceholder(businessConfig.whatsapp)) return null;
  const number = normalizePhone(businessConfig.whatsapp);
  return `${BASE_URL}/${number}?text=${encodeURIComponent(message)}`;
};

/** Convenience helper: product-aware WhatsApp link based on product category. */
export const getProductWhatsAppLink = (product) => {
  if (!product) return getWhatsAppLink();
  const label = `${product.name}${product.model ? ` (${product.model})` : ""}`;
  const message =
    product.category === "alkaline-water-ionizer"
      ? whatsappMessages.alkalineProduct(label)
      : whatsappMessages.roProduct(label);
  return getWhatsAppLink(message);
};
