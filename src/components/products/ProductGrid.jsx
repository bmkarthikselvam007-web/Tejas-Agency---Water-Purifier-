import ProductCard from "./ProductCard";
import { EmptyState, ErrorState, ProductGridSkeleton } from "../common/States";
import Button from "../common/Button";
import { ROUTES } from "../../config/navigation";

/**
 * Renders a product grid together with its loading, error and empty states so
 * every listing page behaves the same way.
 */
export default function ProductGrid({
  products,
  loading = false,
  error = null,
  onRetry,
  columns = 3,
  skeletonCount = 6,
  emptyTitle = "No products match your selection",
  emptyDescription = "Try removing a filter, or contact us and we will help you find a suitable product.",
}) {
  if (loading) return <ProductGridSkeleton count={skeletonCount} />;

  if (error) {
    return (
      <ErrorState
        title="Products could not be loaded"
        description="Something went wrong while loading the catalogue."
        onRetry={onRetry}
      />
    );
  }

  if (!products?.length) {
    return (
      <EmptyState
        icon="grid"
        title={emptyTitle}
        description={emptyDescription}
        action={
          <Button to={ROUTES.contact} variant="secondary">
            Contact us
          </Button>
        }
      />
    );
  }

  return (
    <div className={`grid grid--${columns}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
