import { WhatsAppButton, CallButton } from "./ContactButtons";
import Icon from "./Icon";
import "./CtaBand.css";

/**
 * Compact click-to-WhatsApp band used to break up long pages.
 * Lighter than the full-width FinalCTA so it can sit between two sections
 * without competing with them.
 */
export default function CtaBand({
  title,
  description,
  message,
  whatsappLabel = "Click to WhatsApp",
  showCall = true,
}) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <span className="cta-band__icon" aria-hidden="true">
          <Icon name="whatsapp" size={24} />
        </span>

        <div className="cta-band__text">
          <h2 className="cta-band__title">{title}</h2>
          {description ? (
            <p className="cta-band__description">{description}</p>
          ) : null}
        </div>

        <div className="cta-band__actions">
          <WhatsAppButton size="lg" message={message}>
            {whatsappLabel}
          </WhatsAppButton>
          {showCall ? <CallButton size="lg" variant="secondary" /> : null}
        </div>
      </div>
    </section>
  );
}
