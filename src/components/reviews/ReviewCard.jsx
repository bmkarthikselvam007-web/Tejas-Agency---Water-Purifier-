import Rating from "../common/Rating";
import DemoNotice from "../common/DemoNotice";
import { formatDate } from "../../utils/helpers";
import "./ReviewCard.css";

export default function ReviewCard({ review }) {
  if (!review) return null;

  const initial = review.name?.replace(/[^A-Za-z]/g, "").charAt(0) || "C";

  return (
    <article className="review-card">
      <header className="review-card__header">
        <span className="review-card__avatar" aria-hidden="true">
          {initial}
        </span>
        <div>
          <h3 className="review-card__name">{review.name}</h3>
          <p className="review-card__meta">
            {review.location}
            {review.date ? ` · ${formatDate(review.date)}` : ""}
          </p>
        </div>
        {review.isDemoData ? <DemoNotice variant="chip" /> : null}
      </header>

      <Rating value={review.rating} />

      {review.title ? (
        <h4 className="review-card__title">{review.title}</h4>
      ) : null}

      <p className="review-card__body">{review.body}</p>
    </article>
  );
}
