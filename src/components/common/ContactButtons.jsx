import { useEffect, useId, useRef, useState } from "react";
import Button from "./Button";
import { getWhatsAppLink, whatsappMessages } from "../../utils/whatsapp";
import { getCallLink } from "../../utils/phone";
import { businessConfig, isPlaceholder } from "../../config/business";
import "./ContactButtons.css";

/**
 * Shared behaviour for the WhatsApp and Call CTAs.
 *
 * While the business number is still a placeholder there is no valid link to
 * open, so the CTA stays a real button and explains what is missing instead of
 * rendering a broken href. As soon as the number is filled in
 * `src/config/business.js`, the same CTA becomes a working link everywhere.
 */
function ContactAction({ link, notice, ...buttonProps }) {
  const [showNotice, setShowNotice] = useState(false);
  const noticeId = useId();
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!showNotice) return undefined;
    const onDocumentClick = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setShowNotice(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setShowNotice(false);
    };
    document.addEventListener("mousedown", onDocumentClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showNotice]);

  if (link) {
    return <Button href={link} external {...buttonProps} />;
  }

  return (
    <span
      className={`contact-action${buttonProps.block ? " contact-action--block" : ""}`}
      ref={wrapperRef}
    >
      <Button
        {...buttonProps}
        onClick={() => setShowNotice((open) => !open)}
        aria-describedby={showNotice ? noticeId : undefined}
        aria-expanded={showNotice}
      />
      {showNotice ? (
        <span className="contact-action__notice" id={noticeId} role="status">
          {notice}
        </span>
      ) : null}
    </span>
  );
}

export function WhatsAppButton({
  message = whatsappMessages.general(),
  children = "WhatsApp Us",
  variant = "whatsapp",
  ...rest
}) {
  return (
    <ContactAction
      link={getWhatsAppLink(message)}
      notice={`WhatsApp number not configured yet. Add it to src/config/business.js (currently "${businessConfig.whatsapp}").`}
      variant={variant}
      icon="whatsapp"
      {...rest}
    >
      {children}
    </ContactAction>
  );
}

/**
 * Instagram CTA — the handle is a real, verified account, so this always
 * renders as a link.
 */
export function InstagramButton({
  children = businessConfig.social.instagramHandle,
  variant = "instagram",
  ...rest
}) {
  return (
    <Button
      href={businessConfig.social.instagram}
      external
      variant={variant}
      icon="instagram"
      {...rest}
    >
      {children}
    </Button>
  );
}

/**
 * Link that is not available yet (for example the Google Business Profile URL).
 * Behaves exactly like the contact CTAs: a real link once configured, and an
 * explanatory button until then.
 */
export function PendingLinkButton({ url, notice, children, ...rest }) {
  return (
    <ContactAction link={isPlaceholder(url) ? null : url} notice={notice} {...rest}>
      {children}
    </ContactAction>
  );
}

export function CallButton({
  children = "Call Now",
  variant = "secondary",
  ...rest
}) {
  return (
    <ContactAction
      link={getCallLink()}
      notice={`Phone number not configured yet. Add it to src/config/business.js (currently "${businessConfig.phone}").`}
      variant={variant}
      icon="phone"
      {...rest}
    >
      {children}
    </ContactAction>
  );
}

export default ContactAction;
