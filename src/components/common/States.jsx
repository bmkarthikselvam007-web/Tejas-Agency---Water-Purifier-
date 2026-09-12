import Button from "./Button";
import Icon from "./Icon";
import "./States.css";

/**
 * Shared loading / empty / error states.
 * These exist now so that API integration later needs no new UI work.
 */

export function Skeleton({ width = "100%", height = 16, radius = "var(--radius-sm)" }) {
  return (
    <span
      className="skeleton"
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <Skeleton height={190} radius="var(--radius-md)" />
      <div className="skeleton-card__body">
        <Skeleton width="45%" height={12} />
        <Skeleton width="85%" height={20} />
        <Skeleton width="100%" height={12} />
        <Skeleton width="70%" height={12} />
        <div className="skeleton-card__actions">
          <Skeleton width="48%" height={38} radius="var(--radius-md)" />
          <Skeleton width="48%" height={38} radius="var(--radius-md)" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid--3" role="status" aria-label="Loading products">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="skeleton-detail" role="status" aria-label="Loading product">
      <Skeleton height={380} radius="var(--radius-lg)" />
      <div className="skeleton-detail__body">
        <Skeleton width="35%" height={14} />
        <Skeleton width="80%" height={32} />
        <Skeleton width="100%" height={14} />
        <Skeleton width="92%" height={14} />
        <Skeleton width="60%" height={14} />
        <Skeleton width="55%" height={44} radius="var(--radius-md)" />
      </div>
    </div>
  );
}

export function PageLoader({ label = "Loading" }) {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader__spinner" aria-hidden="true" />
      <span className="page-loader__label">{label}…</span>
    </div>
  );
}

export function EmptyState({
  icon = "grid",
  title = "Nothing to show yet",
  description,
  action,
}) {
  return (
    <div className="state-block">
      <span className="state-block__icon">
        <Icon name={icon} size={26} />
      </span>
      <h3 className="state-block__title">{title}</h3>
      {description ? (
        <p className="state-block__description">{description}</p>
      ) : null}
      {action}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "We could not load this content. Please try again.",
  onRetry,
}) {
  return (
    <div className="state-block state-block--error" role="alert">
      <span className="state-block__icon state-block__icon--error">
        <Icon name="close" size={24} />
      </span>
      <h3 className="state-block__title">{title}</h3>
      <p className="state-block__description">{description}</p>
      {onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
