import PageHero from "../../components/common/PageHero";
import SectionHeading from "../../components/common/SectionHeading";
import CategoryCard from "../../components/products/CategoryCard";
import Icon from "../../components/common/Icon";
import { FinalCTA } from "../../components/home/HomeSections";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { getCategories } from "../../services/categoryService";
import { CATEGORY_IDS } from "../../data/categories";
import { ROUTES } from "../../config/navigation";
import "../../components/home/Home.css";
import "./Products.css";

const categoryPoints = {
  [CATEGORY_IDS.RO]: [
    "Wall-mounted, counter-top and under-sink models",
    "RO, UV, UF, mineral and copper stages",
    "Storage from compact tanks to joint-family sizes",
  ],
  [CATEGORY_IDS.ALKALINE]: [
    "LifeCore counter-top, under-counter and compact models",
    "Selectable alkaline and acidic water levels",
    "Installation, demonstration and filter support",
  ],
};

const helpPoints = [
  {
    icon: "guide",
    title: "Not sure which category you need?",
    description:
      "An RO purifier covers everyday drinking water. A water ionizer is a premium appliance that also lets you select the water level you want.",
  },
  {
    icon: "gauge",
    title: "Tell us your water source",
    description:
      "Municipal, borewell or tanker water changes the shortlist. If you know your TDS reading, that helps even more.",
  },
  {
    icon: "wrench",
    title: "Service is part of the decision",
    description:
      "Every product we sell is backed by installation and service support in Madurai.",
  },
];

export default function Products() {
  useDocumentMeta({
    title: "Our Products — RO Purifiers & Alkaline Water Ionizers",
    description:
      "Explore water purification solutions from Tejas Agency, Madurai: RO water purifiers for everyday drinking water and LifeCore alkaline water ionizers.",
    path: ROUTES.products,
  });

  const { data: categories, loading } = useAsyncData(getCategories, [], []);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Explore Our Water Purification Solutions"
        description="Two distinct product ranges under one roof. Choose a category to see the models we stock, what they are suited for and how to get the current price."
        breadcrumbs={[{ label: "Home", to: ROUTES.home }, { label: "Products" }]}
      />

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="grid grid--2">
              <div className="skeleton" style={{ height: 460, borderRadius: 22 }} />
              <div className="skeleton" style={{ height: 460, borderRadius: 22 }} />
            </div>
          ) : (
            <div className="grid grid--2">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  points={categoryPoints[category.id] ?? []}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Before you choose"
            title="A few things that make the decision easier"
            align="center"
          />
          <div className="grid grid--3">
            {helpPoints.map((point) => (
              <article key={point.title} className="products-help__card">
                <span className="products-help__icon">
                  <Icon name={point.icon} size={20} />
                </span>
                <h3 className="products-help__title">{point.title}</h3>
                <p className="products-help__description">{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        title="Still deciding between the two categories?"
        description="Send us a message with your water source and family size, and we will tell you what makes sense for your home."
      />
    </>
  );
}
