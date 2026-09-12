import { Link } from "react-router-dom";
import Icon from "../common/Icon";
import Button from "../common/Button";
import { WhatsAppButton } from "../common/ContactButtons";
import { findCategoryByProductKeySync } from "../../services/categoryService";
import {
  whatsappMessages,
} from "../../utils/whatsapp";
import { PRODUCT_CATEGORY_KEYS } from "../../data/categories";
import "./ProductCard.css";

/**
 * Reusable product card for every category.
 *
 * The card makes no category-specific assumptions: it renders whichever of the
 * optional fields a product actually has. The only category-aware part is which
 * summary line is emphasised, which is driven by data (`highlightFields`), not
 * by hardcoded branches inside the markup.
 */
export default function ProductCard({ product }) {
  if (!product) return null;

  const category = findCategoryByProductKeySync(product.category);
  const productPath = `/products/${category?.slug ?? ""}/${product.slug}`;
  const isAlkaline = product.category === PRODUCT_CATEGORY_KEYS.ALKALINE;

  const message = isAlkaline
    ? whatsappMessages.alkalineProduct(`${product.name} (${product.model})`)
    : whatsappMessages.roProduct(`${product.name} (${product.model})`);

  // Highlights differ per category but come from the product record itself.
  const highlights = isAlkaline
    ? [
        product.functions?.length
          ? { icon: "gauge", label: `${product.functions.length} functions` }
          : null,
        product.specifications?.find((spec) => spec.label === "Type")
          ? {
              icon: "install",
              label: product.specifications.find(
                (spec) => spec.label === "Type",
              ).value,
            }
          : null,
      ]
    : [
        product.storageCapacity
          ? { icon: "droplet", label: `${product.storageCapacity} storage` }
          : null,
        product.waterSource?.length
          ? { icon: "layers", label: product.waterSource[0] }
          : null,
      ];

  return (
    <article
      className={`product-card${isAlkaline ? " product-card--alkaline" : ""}`}
    >
      <Link
        to={productPath}
        className="product-card__media"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={product.image}
          alt=""
          loading="lazy"
          width="800"
          height="640"
        />
      </Link>

      <div className="product-card__body">
        <span className="product-card__category">
          {category?.shortName ?? "Product"}
        </span>

        <h3 className="product-card__title">
          <Link to={productPath}>{product.name}</Link>
        </h3>

        <p className="product-card__model">Model: {product.model}</p>

        <p className="product-card__description">{product.shortDescription}</p>

        {product.technologies?.length ? (
          <ul className="product-card__tags" aria-label="Key technologies">
            {product.technologies.slice(0, 4).map((tech) => (
              <li key={tech} className="product-card__tag">
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="product-card__highlights">
          {highlights.filter(Boolean).map((highlight) => (
            <li key={highlight.label}>
              <Icon name={highlight.icon} size={16} />
              <span>{highlight.label}</span>
            </li>
          ))}
          {product.warranty ? (
            <li>
              <Icon name="shield" size={16} />
              <span>{product.warranty.split("(")[0].trim()}</span>
            </li>
          ) : null}
        </ul>

        <div className="product-card__footer">
          <span className="product-card__price">{product.priceDisplay}</span>
          <div className="product-card__actions">
            <Button to={productPath} variant="secondary" size="sm">
              View Details
            </Button>
            <WhatsAppButton size="sm" message={message}>
              WhatsApp Enquiry
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </article>
  );
}
