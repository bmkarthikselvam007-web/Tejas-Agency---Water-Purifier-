import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import Button from "../common/Button";
import Icon from "../common/Icon";
import DemoNotice from "../common/DemoNotice";
import Rating from "../common/Rating";
import {
  WhatsAppButton,
  CallButton,
  InstagramButton,
} from "../common/ContactButtons";
import CategoryCard from "../products/CategoryCard";
import ProductGrid from "../products/ProductGrid";
import ReviewCard from "../reviews/ReviewCard";
import { ROUTES } from "../../config/navigation";
import { businessConfig } from "../../config/business";
import { whatsappMessages } from "../../utils/whatsapp";
import { CATEGORY_IDS } from "../../data/categories";

/* ============================================================
   Trust section
   ============================================================ */
export function TrustSection({ points = [] }) {
  return (
    <section className="section section--tight trust">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Why Tejas Agency"
            title={`Water Purification Experts in ${businessConfig.city}`}
            description="Buying a purifier is only the first step — what matters afterwards is installation, filter changes and someone nearby you can call."
            align="center"
          />
        </Reveal>
        <Reveal as="ul" variant="group" className="trust__grid">
          {points.map((point) => (
            <li key={point.id} className="trust__item">
              <span className="trust__icon">
                <Icon name={point.icon} size={22} />
              </span>
              <h3 className="trust__title">{point.title}</h3>
              <p className="trust__description">{point.description}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   Product categories
   ============================================================ */
const categoryPoints = {
  [CATEGORY_IDS.RO]: [
    "Models for municipal, borewell and high TDS water",
    "Storage options for small families to joint families",
    "Installation and filter service support",
  ],
  [CATEGORY_IDS.ALKALINE]: [
    "LifeCore counter-top and under-counter models",
    "Selectable alkaline and acidic water levels",
    "Installation and a full demonstration at handover",
  ],
};

export function CategorySection({ categories = [], loading = false }) {
  return (
    <section className="section section--soft">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Product categories"
            title="Two distinct product ranges"
            description="Tejas Agency stocks everyday RO water purifiers as well as the premium LifeCore water ionizer range. Start with the category that matches what you are looking for."
            align="center"
          />
        </Reveal>

        {loading ? (
          <div className="grid grid--2">
            <div className="skeleton" style={{ height: 420, borderRadius: 22 }} />
            <div className="skeleton" style={{ height: 420, borderRadius: 22 }} />
          </div>
        ) : (
          <Reveal as="div" variant="group" className="grid grid--2">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                points={categoryPoints[category.id] ?? []}
              />
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   Featured products
   ============================================================ */
export function FeaturedProducts({ products, loading, error, onRetry }) {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Featured"
            title="Selected products from both categories"
            description="A quick look at some of the products we stock. Prices are shared on request — message us for the current price."
            action={
              <Button to={ROUTES.products} variant="secondary" iconAfter="arrowRight">
                View all products
              </Button>
            }
          />
        </Reveal>
        <DemoNotice>
          Demo catalogue: product names, models and specifications are
          placeholders for this frontend review and will be replaced with the
          actual product information.
        </DemoNotice>
        <Reveal>
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            onRetry={onRetry}
            skeletonCount={6}
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   Why choose Tejas Agency
   ============================================================ */
const reasons = [
  {
    icon: "location",
    title: "Support in Madurai",
    description:
      "A shop you can walk into, with the same people handling your purchase and your service later.",
  },
  {
    icon: "grid",
    title: "Two product categories",
    description:
      "Everyday RO purifiers and the premium LifeCore ionizer range, so you can compare both before deciding.",
  },
  {
    icon: "guide",
    title: "Guidance, not pressure",
    description:
      "We start from your water source, family size and budget rather than pushing a single model.",
  },
  {
    icon: "install",
    title: "Installation support",
    description:
      "Installation is arranged and the unit is demonstrated before we hand it over.",
  },
  {
    icon: "wrench",
    title: "Service support",
    description:
      "Repair, filter replacement and membrane replacement handled by our own team.",
  },
  {
    icon: "whatsapp",
    title: "Easy WhatsApp assistance",
    description:
      "Send a photo or a question on WhatsApp and get a straight answer.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section why">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow={`Why ${businessConfig.name}`}
            title="What you can expect from us"
            description="No awards, no inflated numbers — just the things that actually matter when you buy a water purifier."
            align="center"
          />
        </Reveal>
        <Reveal as="div" variant="group" className="why__grid">
          {reasons.map((reason) => (
            <article key={reason.title} className="why__item">
              <span className="why__icon">
                <Icon name={reason.icon} size={20} />
              </span>
              <div>
                <h3 className="why__title">{reason.title}</h3>
                <p className="why__description">{reason.description}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   How to choose the right product
   ============================================================ */
const roChecklist = [
  {
    title: "Water source",
    description:
      "Municipal supply, borewell and tanker water behave differently. The source decides which purification stages you need.",
  },
  {
    title: "Family size",
    description:
      "Daily drinking water for two people is very different from a joint family — this drives both storage and throughput.",
  },
  {
    title: "Storage requirement",
    description:
      "If your supply or power is irregular, a larger storage tank saves you a lot of trouble.",
  },
  {
    title: "Purification technology",
    description:
      "RO, UV, UF and mineral stages each do a different job. Most homes use a combination.",
  },
  {
    title: "Water quality",
    description:
      "Knowing the TDS at your location narrows the shortlist quickly. We can guide you on this.",
  },
];

const ionizerChecklist = [
  {
    title: "Product functions",
    description:
      "Which levels the unit offers and how the control panel works day to day.",
  },
  {
    title: "Water ionization",
    description:
      "How electrolysis separates the incoming filtered water into alkaline and acidic streams.",
  },
  {
    title: "Technical specifications",
    description:
      "Electrode plates, filtration stage, display and power requirements.",
  },
  {
    title: "Installation",
    description:
      "Counter-top or under-counter, plus the inlet and drain connections the model needs.",
  },
  {
    title: "Your requirements",
    description:
      "Kitchen space, incoming water quality and how the unit will actually be used at home.",
  },
];

function Checklist({ title, subtitle, items, tone }) {
  return (
    <div className={`choose__card choose__card--${tone}`}>
      <h3 className="choose__card-title">{title}</h3>
      <p className="choose__card-subtitle">{subtitle}</p>
      <ol className="choose__list">
        {items.map((item, index) => (
          <li key={item.title}>
            <span className="choose__step">{index + 1}</span>
            <div>
              <h4 className="choose__item-title">{item.title}</h4>
              <p className="choose__item-description">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ChooseGuide() {
  return (
    <section className="section section--soft choose">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Buying guide"
            title="How to choose the right product"
            description="A short checklist for each category. If you would rather just ask, message us and we will shortlist suitable options for you."
            align="center"
          />
        </Reveal>

        <Reveal as="div" variant="group" className="grid grid--2">
          <Checklist
            tone="primary"
            title="Choosing an RO water purifier"
            subtitle="Five things worth settling before you shortlist a model."
            items={roChecklist}
          />
          <Checklist
            tone="accent"
            title="Choosing a water ionizer"
            subtitle="What to understand about a LifeCore ionizer before buying."
            items={ionizerChecklist}
          />
        </Reveal>

        <Reveal className="choose__cta">
          <div>
            <h3 className="choose__cta-title">Talk to an Expert</h3>
            <p className="choose__cta-text">
              Tell us your water source and family size, and we will suggest what
              suits you.
            </p>
          </div>
          <WhatsAppButton size="lg" message={whatsappMessages.expertAdvice()}>
            Talk to an Expert
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   Service preview
   ============================================================ */
export function ServicePreview({ services = [], loading = false }) {
  return (
    <section className="section service-preview">
      <div className="container service-preview__inner">
        <Reveal className="service-preview__media">
          <img
            src="/images/service/service-visit.svg"
            alt="Illustration of an RO service visit"
            loading="lazy"
            width="800"
            height="560"
          />
        </Reveal>

        <div className="service-preview__content">
          <Reveal>
            <SectionHeading
              eyebrow="Service"
              title={`RO Service & Repair in ${businessConfig.city}`}
              description="Installation, filter replacement, membrane replacement, repair and periodic maintenance — handled by the same team you bought from."
            />
          </Reveal>

          {loading ? (
            <div className="skeleton" style={{ height: 180, borderRadius: 12 }} />
          ) : (
            <Reveal as="ul" variant="group" className="service-preview__list">
              {services.map((service) => (
                <li key={service.id}>
                  <Icon name="check" size={16} />
                  <span>
                    <strong>{service.name}</strong> — {service.shortDescription}
                  </span>
                </li>
              ))}
            </Reveal>
          )}

          <div className="service-preview__actions">
            <WhatsAppButton size="lg" message={whatsappMessages.service()}>
              Book Service on WhatsApp
            </WhatsAppButton>
            <Button to={ROUTES.service} variant="secondary" size="lg">
              View service details
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Reviews preview
   ============================================================ */
export function ReviewsPreview({ reviews = [], summary, loading = false }) {
  return (
    <section className="section section--soft">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Reviews"
            title="What customers say"
            description="Reviews will be published here once they are collected from real customers."
            action={
              <Button to={ROUTES.reviews} variant="secondary" iconAfter="arrowRight">
                View All Reviews
              </Button>
            }
          />
        </Reveal>

        {summary?.isDemoData ? (
          <DemoNotice>
            These are placeholder reviews used to design the page. They are not
            genuine customer reviews and will be replaced before launch.
          </DemoNotice>
        ) : null}

        {summary && !loading ? (
          <div className="reviews-summary">
            <Rating value={summary.averageRating} size={20} showValue />
            <span className="reviews-summary__count">
              {summary.total} demo reviews
            </span>
          </div>
        ) : null}

        {loading ? (
          <div className="grid grid--3">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="skeleton"
                style={{ height: 210, borderRadius: 16 }}
              />
            ))}
          </div>
        ) : (
          <Reveal as="div" variant="group" className="grid grid--3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   Final CTA
   ============================================================ */
export function FinalCTA({
  title = "Need Help Choosing the Right Water Purification Solution?",
  description = "Talk to Tejas Agency and get guidance based on your requirements.",
  message = whatsappMessages.expertAdvice(),
}) {
  return (
    <section className="final-cta">
      <Reveal className="container final-cta__inner">
        <div className="final-cta__text">
          <h2 className="final-cta__title">{title}</h2>
          <p className="final-cta__description">{description}</p>
        </div>
        <div className="final-cta__actions">
          <WhatsAppButton size="lg" message={message}>
            WhatsApp Us
          </WhatsAppButton>
          <InstagramButton size="lg" variant="instagram-solid" />
          <CallButton size="lg" variant="outline-light" />
        </div>
      </Reveal>
      <p className="final-cta__meta">
        Prefer a form?{" "}
        <Link to={ROUTES.contact}>Send us your requirement</Link> and we will get
        back to you.
      </p>
    </section>
  );
}
