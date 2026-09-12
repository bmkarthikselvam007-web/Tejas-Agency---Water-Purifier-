import { useParams } from "react-router-dom";
import ProductHero from "./ProductHero";
import ProductNotFound from "./ProductNotFound";
import {
  FeatureGrid,
  InfoPanel,
  ProductCTA,
  SpecificationTable,
} from "../../components/products/ProductDetailParts";
import RelatedProducts from "../../components/products/RelatedProducts";
import FaqSection from "../../components/faq/FaqSection";
import { ProductDetailSkeleton } from "../../components/common/States";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import {
  getProductBySlugInCategory,
  getRelatedProducts,
} from "../../services/productService";
import { getFaqsByCategory } from "../../services/faqService";
import { PRODUCT_CATEGORY_KEYS } from "../../data/categories";
import { FAQ_CATEGORIES } from "../../data/faqs";
import { whatsappMessages } from "../../utils/whatsapp";
import { ROUTES } from "../../config/navigation";
import { businessConfig } from "../../config/business";
import "./ProductDetails.css";

export default function AlkalineProductDetail() {
  const { slug } = useParams();

  const { data: product, loading } = useAsyncData(
    () => getProductBySlugInCategory(PRODUCT_CATEGORY_KEYS.ALKALINE, slug),
    [slug],
    null,
  );

  const { data: related, loading: relatedLoading } = useAsyncData(
    () => (product ? getRelatedProducts(product, 3) : Promise.resolve([])),
    [product?.slug],
    [],
  );

  const { data: faqs } = useAsyncData(
    () => getFaqsByCategory(FAQ_CATEGORIES.ALKALINE, 4),
    [],
    [],
  );

  useDocumentMeta({
    title: product
      ? `${product.name} (${product.model})`
      : "Alkaline Water Ionizer",
    description: product
      ? `${product.shortDescription} Available at Tejas Agency, ${businessConfig.city}. Contact us for details and price.`
      : "LifeCore alkaline water ionizer details from Tejas Agency, Madurai.",
    path: `${ROUTES.alkalineProducts}/${slug}`,
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
        categoryLabel="Alkaline Water Ionizers"
        categoryTo={ROUTES.alkalineProducts}
        slug={slug}
      />
    );
  }

  const whatsappMessage = whatsappMessages.alkalineProduct(
    `${product.name} (${product.model})`,
  );

  const typeSpec = product.specifications?.find((spec) => spec.label === "Type");

  const facts = [
    typeSpec ? { icon: "ionizer", label: "Type", value: typeSpec.value } : null,
    product.functions?.length
      ? {
          icon: "gauge",
          label: "Functions",
          value: `${product.functions.length} selectable functions`,
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
        categoryName="LifeCore Alkaline Water Ionizer"
        whatsappMessage={whatsappMessage}
        facts={facts}
        breadcrumbs={[
          { label: "Home", to: ROUTES.home },
          { label: "Products", to: ROUTES.products },
          { label: "Alkaline Water Ionizers", to: ROUTES.alkalineProducts },
          { label: product.name },
        ]}
      />

      <section className="section section--tight">
        <div className="container product-detail__body">
          <div className="product-detail__main">
            <FeatureGrid title="Key features" items={product.features} />

            <InfoPanel
              tone="accent"
              title="How ionization works on this model"
              summary={product.ionization?.summary}
              points={product.ionization?.points}
              note={product.ionization?.note}
            />

            <SpecificationTable specifications={product.specifications} />

            <FeatureGrid
              title="Available functions"
              items={product.functions}
              icon="gauge"
              columns={2}
            />

            <FeatureGrid
              title="Suitable for"
              items={product.suitableFor}
              icon="users"
              columns={2}
            />
          </div>

          <aside className="product-detail__aside">
            <InfoPanel
              title="Installation"
              summary={product.installation}
              points={[
                "Site check before installation where needed",
                "Inlet, power and drain connections",
                "Full demonstration of the control panel",
                "Guidance on filter replacement",
              ]}
            />

            <InfoPanel
              title="Warranty"
              summary={product.warranty}
              note="Warranty terms shown here are demo values for this frontend review and will be replaced with LifeCore's actual terms."
            />
          </aside>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <ProductCTA
            product={product}
            message={whatsappMessage}
            description="Send us a message and we will share the price, availability and what the installation involves for this model."
          />
        </div>
      </section>

      <FaqSection
        items={faqs ?? []}
        eyebrow="Ionizer FAQ"
        title="Questions about water ionizers"
        className="section"
      />

      <RelatedProducts
        products={related}
        loading={relatedLoading}
        title="Other LifeCore models"
        description="Compare the rest of the LifeCore range before you decide."
        viewAllTo={ROUTES.alkalineProducts}
        viewAllLabel="View all ionizers"
      />
    </>
  );
}
