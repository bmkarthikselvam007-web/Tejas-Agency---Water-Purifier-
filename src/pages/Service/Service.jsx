import PageHero from "../../components/common/PageHero";
import SectionHeading from "../../components/common/SectionHeading";
import ServiceCard from "../../components/services/ServiceCard";
import FaqSection from "../../components/faq/FaqSection";
import CtaBand from "../../components/common/CtaBand";
import Icon from "../../components/common/Icon";
import { FinalCTA } from "../../components/home/HomeSections";
import {
  WhatsAppButton,
  CallButton,
} from "../../components/common/ContactButtons";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { getServices, getServiceProcess } from "../../services/serviceService";
import { getFaqsByCategory } from "../../services/faqService";
import { FAQ_CATEGORIES } from "../../data/faqs";
import { whatsappMessages } from "../../utils/whatsapp";
import { businessConfig } from "../../config/business";
import { ROUTES } from "../../config/navigation";
import "../../components/home/Home.css";
import "./Service.css";

const supportReasons = [
  {
    icon: "location",
    title: "Nearby, not a call centre",
    description:
      "You are dealing with a shop in Madurai, so follow-ups do not disappear into a queue.",
  },
  {
    icon: "users",
    title: "The same people who sold it",
    description:
      "We already know the product range we stock, which makes diagnosis faster.",
  },
  {
    icon: "whatsapp",
    title: "Simple to reach",
    description:
      "Send a photo of the unit and describe the problem on WhatsApp — that is usually enough to start.",
  },
];

export default function Service() {
  useDocumentMeta({
    title: `RO Service & Repair in ${businessConfig.city}`,
    description:
      "RO service and repair in Madurai from Tejas Agency — repair, filter replacement, membrane replacement, installation and periodic maintenance.",
    path: ROUTES.service,
  });

  const services = useAsyncData(getServices, [], []);
  const process = useAsyncData(getServiceProcess, [], []);
  const faqs = useAsyncData(
    () => getFaqsByCategory(FAQ_CATEGORIES.SERVICE, 6),
    [],
    [],
  );

  return (
    <>
      <PageHero
        eyebrow="Service & Repair"
        title={`RO Service & Repair in ${businessConfig.city}`}
        description="Repair, filter replacement, membrane replacement, installation and periodic maintenance — handled by our own team, with a clear explanation of what needs doing before any work starts."
        variant="navy"
        breadcrumbs={[
          { label: "Home", to: ROUTES.home },
          { label: "RO Service" },
        ]}
        actions={
          <>
            <WhatsAppButton size="lg" message={whatsappMessages.service()}>
              WhatsApp Service
            </WhatsAppButton>
            <CallButton size="lg" variant="outline-light" />
          </>
        }
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What we handle"
            title="Services we offer"
            description="Only the services listed here are offered. If your requirement is not on this list, message us and we will tell you honestly whether we can help."
          />

          {services.loading ? (
            <div className="grid grid--3">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="skeleton"
                  style={{ height: 260, borderRadius: 16 }}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid--3">
              {services.data.map((service) => (
                <ServiceCard key={service.id} service={service} showDetails />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Need a service visit? Message us on WhatsApp."
        description="Send the product details and a photo of the unit. We will tell you what the visit is likely to cover before we come."
        message={whatsappMessages.service()}
        whatsappLabel="Click to WhatsApp"
      />

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="How it works"
            title="The service process"
            description="Four simple steps from the first message to a completed service visit."
            align="center"
          />

          <ol className="service-process">
            {(process.data ?? []).map((step) => (
              <li key={step.step} className="service-process__item">
                <span className="service-process__number">{step.step}</span>
                <h3 className="service-process__title">{step.title}</h3>
                <p className="service-process__description">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container service-split">
          <div>
            <SectionHeading
              eyebrow="Installation"
              title="New installations and relocations"
              description="Installation is arranged for products purchased from us, including mounting, the inlet and drain connections, and a demonstration of how to use and maintain the unit."
            />
            <ul className="service-split__list">
              <li>
                <Icon name="check" size={16} />
                <span>Check the installation point, inlet and drain</span>
              </li>
              <li>
                <Icon name="check" size={16} />
                <span>Mount or place the unit securely</span>
              </li>
              <li>
                <Icon name="check" size={16} />
                <span>Connect the water line and power supply</span>
              </li>
              <li>
                <Icon name="check" size={16} />
                <span>Demonstrate operation and basic maintenance</span>
              </li>
            </ul>
            <WhatsAppButton message={whatsappMessages.installation()}>
              Ask about installation
            </WhatsAppButton>
          </div>

          <div className="service-split__media">
            <img
              src="/images/service/service-visit.svg"
              alt="Illustration of a technician servicing a water purifier"
              loading="lazy"
              width="800"
              height="560"
            />
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Why it matters"
            title="Why a nearby service contact matters"
            align="center"
          />
          <div className="grid grid--3">
            {supportReasons.map((reason) => (
              <article key={reason.title} className="service-reason">
                <span className="service-reason__icon">
                  <Icon name={reason.icon} size={20} />
                </span>
                <h3 className="service-reason__title">{reason.title}</h3>
                <p className="service-reason__description">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        items={faqs.data ?? []}
        eyebrow="Service FAQ"
        title="Service questions"
        description="Common questions about booking a service visit and what it covers."
        className="section"
      />

      <FinalCTA
        title="Need RO service or repair in Madurai?"
        description="Message us with the product details and the problem you are facing, and we will take it from there."
        message={whatsappMessages.service()}
      />
    </>
  );
}
