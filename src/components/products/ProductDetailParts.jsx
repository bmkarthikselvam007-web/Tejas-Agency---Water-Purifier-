import Icon from "../common/Icon";
import Button from "../common/Button";
import { WhatsAppButton, CallButton } from "../common/ContactButtons";
import { ROUTES } from "../../config/navigation";
import "./ProductDetailParts.css";

/**
 * Small building blocks shared by both product detail pages.
 * Each one renders nothing when its data is missing, so the same page layout
 * works for RO purifiers and for water ionizers without category branching.
 */

export function FeatureGrid({ title, items = [], icon = "check", columns = 2 }) {
  if (!items.length) return null;

  return (
    <section className="product-block">
      <h2 className="product-block__title">{title}</h2>
      <ul
        className="feature-grid"
        style={{ "--feature-columns": columns }}
      >
        {items.map((item) => (
          <li key={item} className="feature-grid__item">
            <span className="feature-grid__icon">
              <Icon name={icon} size={16} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TechnologyList({ technologies = [] }) {
  if (!technologies.length) return null;

  return (
    <section className="product-block">
      <h2 className="product-block__title">Purification technologies</h2>
      <ul className="technology-list">
        {technologies.map((tech) => (
          <li key={tech} className="technology-list__item">
            <Icon name="layers" size={18} />
            <span>{tech}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SpecificationTable({ specifications = [], title = "Technical specifications" }) {
  if (!specifications.length) return null;

  return (
    <section className="product-block">
      <h2 className="product-block__title">{title}</h2>
      <div className="spec-table__wrapper">
        <table className="spec-table">
          <tbody>
            {specifications.map((spec) => (
              <tr key={spec.label}>
                <th scope="row">{spec.label}</th>
                <td>{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function InfoPanel({ title, summary, points = [], note, tone = "primary" }) {
  if (!summary && !points.length) return null;

  return (
    <section className={`info-panel info-panel--${tone}`}>
      <h2 className="info-panel__title">{title}</h2>
      {summary ? <p className="info-panel__summary">{summary}</p> : null}
      {points.length ? (
        <ul className="info-panel__points">
          {points.map((point) => (
            <li key={point}>
              <Icon name="check" size={16} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {note ? <p className="info-panel__note">{note}</p> : null}
    </section>
  );
}

export function ProductCTA({ product, message, heading, description }) {
  return (
    <section className="product-cta">
      <div className="product-cta__text">
        <h2 className="product-cta__title">
          {heading ?? `Interested in the ${product?.name}?`}
        </h2>
        <p className="product-cta__description">
          {description ??
            "Send us a message and we will share the current price, availability and what the installation involves."}
        </p>
      </div>
      <div className="product-cta__actions">
        <WhatsAppButton size="lg" message={message}>
          WhatsApp Enquiry
        </WhatsAppButton>
        <CallButton size="lg" variant="outline-light" />
        <Button to={ROUTES.contact} variant="ghost" className="product-cta__link">
          Or send an enquiry form
        </Button>
      </div>
    </section>
  );
}
