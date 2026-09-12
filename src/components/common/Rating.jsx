import Icon from "./Icon";
import "./Rating.css";

/** Star rating display. Purely presentational — never an input. */
export default function Rating({ value = 0, size = 16, showValue = false }) {
  const rounded = Math.round(value);

  return (
    <span className="rating">
      <span className="rating__stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="star"
            size={size}
            className={star <= rounded ? "rating__star--on" : "rating__star--off"}
          />
        ))}
      </span>
      <span className="sr-only">{`Rated ${value} out of 5`}</span>
      {showValue ? (
        <span className="rating__value" aria-hidden="true">
          {Number(value).toFixed(1)}
        </span>
      ) : null}
    </span>
  );
}
