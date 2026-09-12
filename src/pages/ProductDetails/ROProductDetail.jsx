import { useParams } from "react-router-dom";
import ProductHero from "./ProductHero";
import ProductNotFound from "./ProductNotFound";
import {
  FeatureGrid,
  InfoPanel,
  ProductCTA,
  SpecificationTable,
  TechnologyList,
} from "../../components/products/ProductDetailParts";
import RelatedProducts from "../../components/products/RelatedProducts";
import { ProductDetailSkeleton } from "../../components/common/States";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import {
  getProductBySlugInCategory,
  getRelatedProducts,
} from "../../services/productService";
import { PRODUCT_CATEGORY_KEYS } from "../../data/categories";
import { whatsappMessages } from "../../utils/whatsapp";
import { ROUTES } from "../../config/navigation";
import { businessConfig } from "../../config/business";
import "./ProductDetails.css";

export default function ROProductDetail() {
  const { slug } = useParams();

  const { data: product, loading } = useAsyncData(
    () => getProductBySlugInCategory(PRODUCT_CATEGORY_KEYS.RO, slug),
    [slug],
    null,
  );

  const { data: related, loading: relatedLoading } = useAsyncData(
    () => (product ? getRelatedProducts(product, 3) : Promise.resolve([])),
    [product?.slug],
    [],
  );

  useDocumentMeta({
    title: product ? `${product.name} (${product.model})` : "RO Water Purifier",
    description: product
      ? `${product.shortDescription} Available at Tejas Agency, ${businessConfig.city}. Contact us for the current price.`
      : "RO water purifier details from Tejas Agency, Madurai.",
    path: `${ROUTES.roProducts}/${slug}`,
    image: product?.image,
    type: "product",
  });

  if (loading) {
    return (
      <div className="section container">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <ProductNotFound
        categoryLabel="RO Water Purifiers"
        categoryTo={ROUTES.roProducts}
        slug={slug}
      />
    );
  }

  const whatsappMessage = whatsappMessages.roProduct(
    `${product.name} (${product.model})`,
  );

  const facts = [
    product.storageCapacity
      ? {
          icon: "droplet",
          label: "Storage",
          value: product.storageCapacity,
        }
      : null,
    product.waterSource?.length
      ? {
          icon: "layers",
          label: "Water source",
          value: product.waterSource.join(", "),
        }
      : null,
    product.warranty
      ? { icon: "shield", label: "Warranty", value: product.warranty }
      : null,
  ].filter(Boolean);

  return (
    <>
      <ProductHero
        product={product}
        categoryName="RO Water Purifier"
        whatsappMessage={whatsappMessage}
        facts={facts}
        breadcrumbs={[
          { label: "Home", to: ROUTES.home },
          { label: "Products", to: ROUTES.products },
          { label: "RO Water Purifiers", to: ROUTES.roProducts },
          { label: product.name },
        ]}
      />

      <section className="section section--tight">
        <div className="container product-detail__body">
          <div className="product-detail__main">
            <FeatureGrid title="Key features" items={product.features} />

            <TechnologyList technologies={product.technologies} />

            <SpecificationTable specifications={product.specifications} />

            <FeatureGrid
              title="Suitable for"
              items={product.suitableFor}
              icon="users"
              columns={2}
            />
          </div>

          <aside className="product-detail__aside">
            <InfoPanel
              title="Installation & service"
              summary={`Installation is arranged for products purchased from Tejas Agency, and the unit is demonstrated before handover. Filter replacement, membrane replacement and repair are handled by our own team in ${businessConfig.city}.`}
              points={[
                "Installation at your home",
                "Demonstration before handover",
                "Filter and membrane replacement",
                "Repair and periodic maintenance",
              ]}
              note="Service availability and charges are confirmed when you contact us."
            />

            <InfoPanel
              title="Warranty"
              summary={product.warranty}
              note="Warranty terms shown here are demo values for this frontend review and will be replaced with the manufacturer's actual terms."
            />
          </aside>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <ProductCTA product={product} message={whatsappMessage} />
        </div>
      </section>

      <RelatedProducts
        products={related}
        loading={relatedLoading}
        title="Related RO purifiers"
        description="Other models in the same category that may suit your requirement."
        viewAllTo={ROUTES.roProducts}
        viewAllLabel="View all RO purifiers"
      />
    </>
  );
}
