import { useMemo, useState } from "react";
import PageHero from "../../components/common/PageHero";
import SectionHeading from "../../components/common/SectionHeading";
import DemoNotice from "../../components/common/DemoNotice";
import ProductGrid from "../../components/products/ProductGrid";
import ProductFilters from "../../components/products/ProductFilters";
import FaqSection from "../../components/faq/FaqSection";
import Icon from "../../components/common/Icon";
import { FinalCTA } from "../../components/home/HomeSections";
import { WhatsAppButton, CallButton } from "../../components/common/ContactButtons";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import {
  getProductFilterOptions,
  getProductsByCategory,
} from "../../services/productService";
import { getFaqsByCategory } from "../../services/faqService";
import { findCategoryBySlugSync } from "../../services/categoryService";
import { PRODUCT_CATEGORY_KEYS, CATEGORY_IDS } from "../../data/categories";
import { FAQ_CATEGORIES } from "../../data/faqs";
import { whatsappMessages } from "../../utils/whatsapp";
import { businessConfig } from "../../config/business";
import { ROUTES } from "../../config/navigation";
import "../../components/home/Home.css";
import "./ROProducts.css";

const intro = [
  {
    icon: "layers",
    title: "Multi-stage purification",
    description:
      "RO combined with UV, UF, mineral or copper stages depending on the model you choose.",
  },
  {
    icon: "droplet",
    title: "Storage that fits your home",
    description:
      "Compact 6 litre units through to 12 litre and larger tanks for joint families.",
  },
  {
    icon: "gauge",
    title: "Matched to your water",
    description:
      "Different models suit municipal supply, borewell water and higher TDS conditions.",
  },
];

export default function ROProducts() {
  const category = findCategoryBySlugSync(CATEGORY_IDS.RO);

  useDocumentMeta({
    title: `RO Water Purifiers in ${businessConfig.city}`,
    description:
      "Browse RO water purifiers available at Tejas Agency, Madurai — RO, UV, UF, mineral and copper models with installation and service support.",
    path: ROUTES.roProducts,
  });

  const products = useAsyncData(
    () => getProductsByCategory(PRODUCT_CATEGORY_KEYS.RO),
    [],
    [],
  );
  const filterOptions = useAsyncData(
    () => getProductFilterOptions(PRODUCT_CATEGORY_KEYS.RO),
    [],
    { technologies: [], waterSources: [] },
  );
  const faqs = useAsyncData(
    () => getFaqsByCategory(FAQ_CATEGORIES.RO, 5),
    [],
    [],
  );

  const [filters, setFilters] = useState({
    technology: "all",
    waterSource: "all",
  });

  const filteredProducts = useMemo(() => {
    const list = products.data ?? [];
    return list.filter((product) => {
      const matchesTech =
        filters.technology === "all" ||
        product.technologies?.includes(filters.technology);
      const matchesSource =
        filters.waterSource === "all" ||
        product.waterSource?.includes(filters.waterSource);
      return matchesTech && matchesSource;
    });
  }, [products.data, filters]);

  return (
    <>
      <PageHero
        eyebrow="RO Water Purifiers"
        title={`RO Water Purifiers in ${businessConfig.city}`}
        description={category?.longDescription}
        breadcrumbs={[
          { label: "Home", to: ROUTES.home },
          { label: "Products", to: ROUTES.products },
          { label: "RO Water Purifiers" },
        ]}
        actions={
          <>
            <WhatsAppButton
              message={whatsappMessages.category("RO water purifier")}
            >
              Ask for a recommendation
            </WhatsAppButton>
            <CallButton />
          </>
        }
      />

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid--3">
            {intro.map((item) => (
              <article key={item.title} className="ro-intro__card">
                <span className="ro-intro__icon">
                  <Icon name={item.icon} size={20} />
                </span>
                <h2 className="ro-intro__title">{item.title}</h2>
                <p className="ro-intro__description">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight ro-catalogue">
        <div className="container">
          <SectionHeading
            title="Available RO purifiers"
            description="Prices are shared on request. Message us with the model you are interested in and we will confirm availability and the current price."
          />

          <DemoNotice>
            Demo catalogue: these products, models and specifications are
            placeholders created for this frontend review. They will be replaced
            with the actual product range supplied by Tejas Agency.
          </DemoNotice>

          <ProductFilters
            options={filterOptions.data}
            value={filters}
            onChange={setFilters}
            resultCount={filteredProducts.length}
            totalCount={products.data?.length ?? 0}
          />

          <ProductGrid
            products={filteredProducts}
            loading={products.loading}
            error={products.error}
            onRetry={products.reload}
            skeletonCount={6}
          />
        </div>
      </section>

      <FaqSection
        items={faqs.data ?? []}
        eyebrow="RO FAQ"
        title="Questions about RO purifiers"
        description="Short answers to the questions customers ask most often before buying."
      />

      <FinalCTA
        title="Not sure which RO purifier suits your water?"
        description="Send us your water source, family size and TDS reading if you have one. We will shortlist suitable models."
        message={whatsappMessages.category("RO water purifier")}
      />
    </>
  );
}
