import { useState } from "react";
import "./ProductGallery.css";

/**
 * Product image gallery with thumbnail selection.
 * Falls back to a single image when a product has no extra gallery entries.
 * Callers pass `key={product.slug}` so the selected thumbnail resets when the
 * product changes.
 */
export default function ProductGallery({ images = [], alt }) {
  const gallery = images.filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!gallery.length) {
    return <div className="product-gallery product-gallery--empty" aria-hidden="true" />;
  }

  return (
    <div className="product-gallery">
      <div className="product-gallery__main">
        <img
          src={gallery[activeIndex]}
          alt={alt}
          width="800"
          height="640"
          fetchPriority="high"
        />
      </div>

      {gallery.length > 1 ? (
        <ul className="product-gallery__thumbs">
          {gallery.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                className={`product-gallery__thumb${
                  index === activeIndex ? " product-gallery__thumb--active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1} of ${gallery.length}`}
                aria-pressed={index === activeIndex}
              >
                <img src={image} alt="" loading="lazy" width="160" height="128" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
