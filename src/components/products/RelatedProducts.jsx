import SectionHeading from "../common/SectionHeading";
import ProductGrid from "./ProductGrid";
import Button from "../common/Button";

/** "You may also consider" block shown at the bottom of a product page. */
export default function RelatedProducts({
  products,
  loading,
  title = "Related products",
  description,
  viewAllTo,
  viewAllLabel = "View all",
}) {
  if (!loading && !products?.length) return null;

  return (
    <section className="section section--soft">
      <div className="container">
        <SectionHeading
          title={title}
          description={description}
          action={
            viewAllTo ? (
              <Button to={viewAllTo} variant="secondary" iconAfter="arrowRight">
                {viewAllLabel}
              </Button>
            ) : null
          }
        />
        <ProductGrid
          products={products}
          loading={loading}
          skeletonCount={3}
          emptyTitle="No related products yet"
        />
      </div>
    </section>
  );
}
