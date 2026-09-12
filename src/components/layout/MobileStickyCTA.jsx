import { WhatsAppButton, CallButton } from "../common/ContactButtons";
import "./MobileStickyCTA.css";

/**
 * Fixed WhatsApp / Call bar shown on mobile only.
 * `body` reserves matching bottom padding in globals.css so the bar never
 * covers page content.
 */
export default function MobileStickyCTA() {
  return (
    <div className="mobile-cta" role="region" aria-label="Quick contact">
      <WhatsAppButton block>WhatsApp</WhatsAppButton>
      <CallButton block variant="dark">
        Call Now
      </CallButton>
    </div>
  );
}
