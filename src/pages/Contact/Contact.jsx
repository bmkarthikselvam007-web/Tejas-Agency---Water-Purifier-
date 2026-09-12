import PageHero from "../../components/common/PageHero";
import SectionHeading from "../../components/common/SectionHeading";
import ContactForm from "../../components/forms/ContactForm";
import Icon from "../../components/common/Icon";
import Button from "../../components/common/Button";
import {
  WhatsAppButton,
  CallButton,
} from "../../components/common/ContactButtons";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { businessConfig, isPlaceholder } from "../../config/business";
import { getCallLink, getPhoneDisplay } from "../../utils/phone";
import { getWhatsAppLink } from "../../utils/whatsapp";
import { ROUTES } from "../../config/navigation";
import "./Contact.css";

export default function Contact() {
  useDocumentMeta({
    title: `Contact ${businessConfig.name}`,
    description:
      "Contact Tejas Agency in Madurai for RO water purifiers, alkaline water ionizers, installation and RO service. Call, WhatsApp or send an enquiry.",
    path: ROUTES.contact,
  });

  const callLink = getCallLink();
  const whatsappLink = getWhatsAppLink();
  const hasMap = !isPlaceholder(businessConfig.mapsEmbedUrl);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={`Talk to ${businessConfig.name}`}
        description="Call, message on WhatsApp, or send your requirement through the form. We will get back to you with the details you need."
        breadcrumbs={[{ label: "Home", to: ROUTES.home }, { label: "Contact" }]}
        actions={
          <>
            <WhatsAppButton size="lg" />
            <CallButton size="lg" variant="dark" />
          </>
        }
      />

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-details">
            <SectionHeading
              eyebrow="Business details"
              title="Where to find us"
              description="Contact details are placeholders in this demo build and will be replaced with the agency's actual information."
            />

            <ul className="contact-details__list">
              <li>
                <span className="contact-details__icon">
                  <Icon name="phone" size={18} />
                </span>
                <div>
                  <h3>Phone</h3>
                  {callLink ? (
                    <a href={callLink}>{getPhoneDisplay()}</a>
                  ) : (
                    <p>{businessConfig.phoneDisplay}</p>
                  )}
                </div>
              </li>

              <li>
                <span className="contact-details__icon">
                  <Icon name="whatsapp" size={18} />
                </span>
                <div>
                  <h3>WhatsApp</h3>
                  {whatsappLink ? (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getPhoneDisplay()}
                    </a>
                  ) : (
                    <p>{businessConfig.whatsappDisplay}</p>
                  )}
                </div>
              </li>

              <li>
                <span className="contact-details__icon">
                  <Icon name="location" size={18} />
                </span>
                <div>
                  <h3>Address</h3>
                  <address>
                    {businessConfig.addressLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                </div>
              </li>

              <li>
                <span className="contact-details__icon">
                  <Icon name="clock" size={18} />
                </span>
                <div>
                  <h3>Business hours</h3>
                  <ul className="contact-details__hours">
                    {businessConfig.businessHoursDetail.map((entry) => (
                      <li key={entry.days}>
                        <span>{entry.days}</span>
                        <span>{entry.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li>
                <span className="contact-details__icon">
                  <Icon name="mail" size={18} />
                </span>
                <div>
                  <h3>Email</h3>
                  <p>{businessConfig.emailDisplay}</p>
                </div>
              </li>
            </ul>

            <div className="contact-store">
              <img
                src="/images/store/store-front.svg"
                alt="Illustration of the Tejas Agency shop front (placeholder)"
                loading="lazy"
                width="800"
                height="560"
              />
              <p>Store photo placeholder — replace with a real photograph.</p>
            </div>
          </div>

          <div className="contact-form-column">
            <SectionHeading
              eyebrow="Enquiry"
              title="Send us your requirement"
              description="Tell us what you need and we will get back to you with suitable options and pricing."
            />
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Location"
            title={`Find us in ${businessConfig.city}`}
            description="Drop in to see the products in person, or use the map link for directions."
            action={
              !isPlaceholder(businessConfig.mapsUrl) ? (
                <Button
                  href={businessConfig.mapsUrl}
                  external
                  variant="secondary"
                  icon="location"
                >
                  Open in Google Maps
                </Button>
              ) : null
            }
          />

          {hasMap ? (
            <div className="contact-map">
              <iframe
                src={businessConfig.mapsEmbedUrl}
                title={`${businessConfig.name} location on Google Maps`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="contact-map contact-map--placeholder">
              <Icon name="location" size={34} />
              <h3>Google Map placeholder</h3>
              <p>
                The embedded map will appear here once the business location is
                confirmed. Add the embed URL to{" "}
                <code>src/config/business.js</code> (
                <code>mapsEmbedUrl</code>) and the map renders automatically.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
