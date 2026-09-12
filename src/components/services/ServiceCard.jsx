import Icon from "../common/Icon";
import "./ServiceCard.css";

/** Reusable service card used on the homepage preview and the service page. */
export default function ServiceCard({ service, showDetails = false }) {
  if (!service) return null;

  return (
    <article className="service-card">
      <span className="service-card__icon">
        <Icon name={service.icon} size={22} />
      </span>
      <h3 className="service-card__title">{service.name}</h3>
      <p className="service-card__description">{service.shortDescription}</p>

      {showDetails && service.details?.length ? (
        <ul className="service-card__list">
          {service.details.map((detail) => (
            <li key={detail}>
              <Icon name="check" size={15} />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
