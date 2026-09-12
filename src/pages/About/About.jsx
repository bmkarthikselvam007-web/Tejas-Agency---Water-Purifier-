import PageHero from "../../components/common/PageHero";
import SectionHeading from "../../components/common/SectionHeading";
import CategoryCard from "../../components/products/CategoryCard";
import Icon from "../../components/common/Icon";
import DemoNotice from "../../components/common/DemoNotice";
import { FinalCTA } from "../../components/home/HomeSections";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { getCategories } from "../../services/categoryService";
import { getTrustPoints } from "../../services/serviceService";
import { businessConfig } from "../../config/business";
import { ROUTES } from "../../config/navigation";
import "../../components/home/Home.css";
import "./About.css";

const approach = [
  {
    icon: "guide",
    title: "Understand the requirement first",
    description:
      "Water source, family size, kitchen space and budget — before any model is suggested.",
  },
  {
    icon: "layers",
    title: "Show the real options",
    description:
      "Both product categories are explained, including when a simpler product is enough.",
  },
  {
    icon: "install",
    title: "Install and demonstrate",
    description:
      "The unit is installed and demonstrated so you know how to use and maintain it.",
  },
  {
    icon: "wrench",
    title: "Stay available afterwards",
    description:
      "Filter changes, membrane replacement and repairs are handled by the same team.",
  },
];

export default function About() {
  useDocumentMeta({
    title: `About ${businessConfig.name}`,
    description:
      "About Tejas Agency — a water purification business in Madurai offering RO water purifiers, LifeCore alkaline water ionizers, installation and service support.",
    path: ROUTES.about,
  });

  const { data: categories, loading } = useAsyncData(getCategories, [], []);

  return (
    <>
      <PageHero
        eyebrow="About us"
        title={`${businessConfig.name} — water purification in ${businessConfig.city}`}
        description="A Madurai business focused on helping homes choose, install and maintain the right water purification product."
        breadcrumbs={[
          { label: "Home", to: ROUTES.home },
          { label: "About Us" },
        ]}
      />

      <section className="section">
        <div className="container about-story">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="A shop in Madurai, not a distant brand"
            />
            <DemoNotice>
              Placeholder story: the paragraphs below are written to show the
              page structure. The agency owner will supply the real background,
              and no years of experience, customer counts or awards are claimed
              anywhere on this site.
            </DemoNotice>
            <p className="lead">
              Tejas Agency is based in {businessConfig.city},{" "}
              {businessConfig.state}. We supply RO water purifiers and LifeCore
              alkaline water ionizers, and we support what we sell with
              installation and service.
            </p>
            <p>
              [Replace with the agency&apos;s own background — how the business
              started, what it focuses on, and anything the owner wants
              customers to know.]
            </p>
            <p>
              What stays constant is the approach: understand the water and the
              household first, explain the options plainly, and remain reachable
              after the sale.
            </p>
          </div>

          <div className="about-story__media">
            <img
              src="/images/store/store-front.svg"
              alt="Illustration of the Tejas Agency store front (placeholder)"
              loading="lazy"
              width="800"
              height="560"
            />
            <p className="about-story__caption">
              Store photo placeholder — replace with an actual photograph of the
              shop.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Our presence"
            title={`Serving ${businessConfig.city} and the surrounding areas`}
            description="You can visit the shop, call, or send a message and reach the same people each time."
            align="center"
          />
          <ul className="trust__grid">
            {getTrustPoints().map((point) => (
              <li key={point.id} className="trust__item">
                <span className="trust__icon">
                  <Icon name={point.icon} size={22} />
                </span>
                <h3 className="trust__title">{point.title}</h3>
                <p className="trust__description">{point.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What we stock"
            title="Two product categories"
            description="Everyday RO purifiers and the premium LifeCore water ionizer range."
          />
          {loading ? (
            <div className="grid grid--2">
              <div className="skeleton" style={{ height: 400, borderRadius: 22 }} />
              <div className="skeleton" style={{ height: 400, borderRadius: 22 }} />
            </div>
          ) : (
            <div className="grid grid--2">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} size="md" />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section--soft">
        <div className="container about-approach">
          <div className="about-approach__media">
            <img
              src="/images/store/store-interior.svg"
              alt="Illustration of purifier models displayed in the store (placeholder)"
              loading="lazy"
              width="800"
              height="560"
            />
          </div>

          <div>
            <SectionHeading
              eyebrow="Customer first"
              title="How we work with customers"
              description="Four steps that describe what buying from us actually looks like."
            />
            <ol className="about-approach__list">
              {approach.map((item, index) => (
                <li key={item.title}>
                  <span className="about-approach__step">
                    <Icon name={item.icon} size={18} />
                  </span>
                  <div>
                    <h3 className="about-approach__title">
                      {index + 1}. {item.title}
                    </h3>
                    <p className="about-approach__description">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <FinalCTA
        title="Have a question about your water?"
        description="Message us or call, and we will help you work out what suits your home."
      />
    </>
  );
}
