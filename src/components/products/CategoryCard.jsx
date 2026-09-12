import { Link } from "react-router-dom";
import Icon from "../common/Icon";
import Button from "../common/Button";
import { CATEGORY_IDS } from "../../data/categories";
import "./CategoryCard.css";

/**
 * Large category card used on the homepage and the products gateway page.
 * Size variant controls how much supporting detail is shown.
 */
export default function CategoryCard({ category, size = "lg", points = [] }) {
  if (!category) return null;

  const isAlkaline = category.id === CATEGORY_IDS.ALKALINE;
  const to = `/products/${category.slug}`;

  return (
    <article
      className={`category-card category-card--${size}${
        isAlkaline ? " category-card--alkaline" : ""
      }`}
    >
      <Link to={to} className="category-card__media" tabIndex={-1} aria-hidden="true">
        <img
          src={category.image}
          alt=""
          loading="lazy"
          width="800"
          height="500"
        />
      </Link>

      <div className="category-card__body">
        <span className="category-card__badge">
          <Icon name={isAlkaline ? "ionizer" : "droplet"} size={16} />
          {category.tagline}
        </span>

        <h3 className="category-card__title">
          <Link to={to}>{category.name}</Link>
        </h3>

        <p className="category-card__description">{category.description}</p>

        {points.length ? (
          <ul className="category-card__points">
            {points.map((point) => (
              <li key={point}>
                <Icon name="check" size={16} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <Button to={to} variant="primary" iconAfter="arrowRight">
          {category.ctaLabel}
        </Button>
      </div>
    </article>
  );
}
