import PageHero from "../../components/common/PageHero";
import SectionHeading from "../../components/common/SectionHeading";
import DemoNotice from "../../components/common/DemoNotice";
import ProductGrid from "../../components/products/ProductGrid";
import FaqSection from "../../components/faq/FaqSection";
import Icon from "../../components/common/Icon";
import { FinalCTA } from "../../components/home/HomeSections";
import {
  WhatsAppButton,
  CallButton,
} from "../../components/common/ContactButtons";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { getProductsByCategory } from "../../services/productService";
import { getFaqsByCategory } from "../../services/faqService";
import { findCategoryBySlugSync } from "../../services/categoryService";
import { PRODUCT_CATEGORY_KEYS, CATEGORY_IDS } from "../../data/categories";
import { FAQ_CATEGORIES } from "../../data/faqs";
import { whatsappMessages } from "../../utils/whatsapp";
import { ROUTES } from "../../config/navigation";
import "../../components/home/Home.css";
import "./AlkalineProducts.css";

const ionizationSteps = [
  {
    step: "01",
    title: "Filtration",
    description:
      "Incoming water passes through the unit's filter before anything else happens.",
  },
  {
    step: "02",
    title: "Electrolysis",
    description:
      "The filtered water flows across electrode plates, where it is separated into two streams.",
  },
  {
    step: "03",
    title: "Level selection",
    description:
      "You choose the level you want from the control panel, and the display confirms it.",
  },
  {
    step: "04",
    title: "Separate outlets",
    description:
      "The alkaline stream is dispensed for use, while the acidic stream goes to a separate outlet.",
  },
];

const technicalPoints = [
  { icon: "layers", label: "Multi-plate electrode chamber" },
  { icon: "gauge", label: "Selectable alkaline and acidic levels" },
  { icon: "filter", label: "Inline replaceable filter" },
  { icon: "install", label: "Counter-top or under-counter installation" },
  { icon: "shield", label: "Warranty as per LifeCore terms" },
  { icon: "wrench", label: "Installation and demonstration by our team" },
];

export default function AlkalineProducts() {
  const category = findCategoryBySlugSync(CATEGORY_IDS.ALKALINE);

  useDocumentMeta({
    title: "LifeCore Alkaline Water Ionizers",
    description:
      "LifeCore alkaline water ionizers at Tejas Agency, Madurai — counter-top, under-counter and compact models with installation and demonstration.",
    path: ROUTES.alkalineProducts,
  });

  const products = useAsyncData(
    () => getProductsByCategory(PRODUCT_CATEGORY_KEYS.ALKALINE),
    [],
    [],
  );
  const faqs = useAsyncData(
    () => getFaqsByCategory(FAQ_CATEGORIES.ALKALINE, 5),
    [],
    [],
  );

  return (
    <>
      <PageHero
        eyebrow="LifeCore Range"
        title="LifeCore Alkaline Water Ionizers"
        description={category?.longDescription}
        variant="navy"
        breadcrumbs={[
          { label: "Home", to: ROUTES.home },
          { label: "Products", to: ROUTES.products },
          { label: "Alkaline Water Ionizers" },
        ]}
        actions={
          <>
            <WhatsAppButton
              message={whatsappMessages.category("LifeCore alkaline water ionizer")}
            >
              Enquire on WhatsApp
            </WhatsAppButton>
            <CallButton variant="outline-light" />
          </>
        }
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="How it works"
            title="What a water ionizer actually does"
            description="A water ionizer filters the incoming water and then uses electrolysis to separate it into an alkaline stream and an acidic stream. You select the level you want from the control panel."
          />

          <ol className="ionization-steps">
            {ionizationSteps.map((item) => (
              <li key={item.step} className="ionization-steps__item">
                <span className="ionization-steps__number">{item.step}</span>
                <h3 className="ionization-steps__title">{item.title}</h3>
                <p className="ionization-steps__description">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>

          <p className="ionization-note">
            Tejas Agency presents product functions and specifications only. We
            do not make health or medical claims about ionized water — for health
            related questions please consult a qualified professional.
          </p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="LifeCore products"
            title="Models we stock"
            description="Prices are shared on request. Message us for the current price, availability and what the installation involves."
          />

          <DemoNotice>
            Demo catalogue: these LifeCore entries are placeholders for the
            frontend review. Actual model names, specifications and images will
            replace them.
          </DemoNotice>

          <ProductGrid
            products={products.data}
            loading={products.loading}
            error={products.error}
            onRetry={products.reload}
            columns={3}
            skeletonCount={3}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="ionizer-specs">
            <div>
              <SectionHeading
                eyebrow="Technical features"
                title="What to look at on an ionizer"
                description="These are the specifications worth comparing across models before you decide."
              />
              <ul className="ionizer-specs__list">
                {technicalPoints.map((point) => (
                  <li key={point.label}>
                    <Icon name={point.icon} size={18} />
                    <span>{point.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ionizer-specs__media">
              <img
                src="/images/products/lifecore/category-lifecore.svg"
                alt="Illustration of a LifeCore alkaline water ionizer"
                loading="lazy"
                width="800"
                height="500"
              />
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        items={faqs.data ?? []}
        eyebrow="Ionizer FAQ"
        title="Questions about water ionizers"
        description="What customers usually ask before buying a LifeCore ionizer."
      />

      <FinalCTA
        title="Want to see a LifeCore ionizer in person?"
        description="Message us and we will walk you through the functions, installation requirements and the current price."
        message={whatsappMessages.category("LifeCore alkaline water ionizer")}
      />
    </>
  );
}
