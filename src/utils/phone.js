import { businessConfig, isPlaceholder } from "../config/business";

/** Strip everything that is not a digit (keeps a leading + out of tel: noise). */
export const normalizePhone = (value = "") => String(value).replace(/\D/g, "");

/**
 * tel: link for the business number.
 * Returns null while the placeholder number is still configured so callers can
 * disable the control instead of producing a broken link.
 */
export const getCallLink = (phone = businessConfig.phone) => {
  if (isPlaceholder(phone)) return null;
  return `tel:+${normalizePhone(phone)}`;
};

/** Human readable number for display in the UI. */
export const getPhoneDisplay = () =>
  isPlaceholder(businessConfig.phone)
    ? businessConfig.phoneDisplay
    : formatIndianPhone(businessConfig.phone);

/** +91 98765 43210 style formatting for a 12 digit Indian number. */
export const formatIndianPhone = (value) => {
  const digits = normalizePhone(value);
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return `+${digits}`;
};

/** Frontend validation for an Indian mobile number entered in the contact form. */
export const isValidIndianMobile = (value = "") => {
  const digits = normalizePhone(value);
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  return /^[6-9]\d{9}$/.test(local);
};
