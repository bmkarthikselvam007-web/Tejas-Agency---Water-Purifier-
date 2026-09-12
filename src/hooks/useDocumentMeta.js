import { useEffect } from "react";
import { businessConfig, isPlaceholder } from "../config/business";

const setMetaTag = (attr, key, content) => {
  if (!content) return null;
  let element = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
  return element;
};

const setLinkTag = (rel, href) => {
  if (!href) return null;
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
  return element;
};

/**
 * Lightweight client-side metadata handling (title, description, canonical,
 * Open Graph). Kept in one hook so it can later be swapped for a server
 * rendered / pre-rendered solution without touching page components.
 */
export function useDocumentMeta({
  title,
  description,
  path,
  image = businessConfig.defaultOgImage,
  type = "website",
} = {}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${businessConfig.name}`
      : `${businessConfig.name} - ${businessConfig.tagline} in ${businessConfig.city}`;

    document.title = fullTitle;
    setMetaTag("name", "description", description);

    const origin = isPlaceholder(businessConfig.siteUrl)
      ? window.location.origin
      : businessConfig.siteUrl.replace(/\/$/, "");
    const canonical = `${origin}${path ?? window.location.pathname}`;

    setLinkTag("canonical", canonical);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:url", canonical);
    setMetaTag("property", "og:site_name", businessConfig.name);
    setMetaTag("property", "og:image", `${origin}${image}`);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
  }, [title, description, path, image, type]);
}

export default useDocumentMeta;
