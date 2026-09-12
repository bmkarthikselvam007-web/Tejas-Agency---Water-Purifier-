import Breadcrumbs from "../../components/common/Breadcrumbs";
import ProductGallery from "../../components/products/ProductGallery";
import Icon from "../../components/common/Icon";
import {
  WhatsAppButton,
  CallButton,
} from "../../components/common/ContactButtons";
import DemoNotice from "../../components/common/DemoNotice";
import "./ProductDetails.css";

/**
 * Shared product hero: gallery on the left, summary and CTAs on the right.
 * `facts` is supplied by each page so RO fields are not forced onto ionizers.
 */
export default function ProductHero({
  product,
  categoryName,
  breadcrumbs,
  facts = [],
  whatsappMessage,
}) {
  return (
    <section className="product-hero">
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />

        <div className="product-hero__grid">
          <ProductGallery
            key={product.slug}
            images={product.gallery}
            alt={product.name}
          />

          <div className="product-hero__content">
            <span className="product-hero__category">{categoryName}</span>
            <h1 className="product-hero__title">{product.name}</h1>
            <p className="product-hero__model">Model: {product.model}</p>
            <p className="product-hero__description">
              {product.shortDescription}
            </p>

            {product.technologies?.length ? (
              <ul className="product-hero__tags">
                {product.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            ) : null}

            {facts.length ? (
              <dl className="product-hero__facts">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>
                      <Icon name={fact.icon} size={16} />
                      {fact.label}
                    </dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="product-hero__price">
              <span className="product-hero__price-value">
                {product.priceDisplay}
              </span>
              <span className="product-hero__price-note">
                Message us for the current price and offers
              </span>
            </div>

            <div className="product-hero__actions">
              <WhatsAppButton size="lg" message={whatsappMessage}>
                WhatsApp Enquiry
              </WhatsAppButton>
              <CallButton size="lg" variant="dark" />
            </div>

            {product.isDemoData ? (
              <DemoNotice>
                Demo product: this model, its features and specifications are
                placeholder content for the frontend review.
              </DemoNotice>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
