import { Link } from "react-router-dom";
import Icon from "../common/Icon";
import { businessConfig, isPlaceholder } from "../../config/business";
import {
  footerNavigation,
  legalNavigation,
  ROUTES,
} from "../../config/navigation";
import { getCallLink, getPhoneDisplay } from "../../utils/phone";
import { getWhatsAppLink } from "../../utils/whatsapp";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const callLink = getCallLink();
  const whatsappLink = getWhatsAppLink();
  const whatsappDisplay = isPlaceholder(businessConfig.whatsapp)
    ? businessConfig.whatsappDisplay
    : getPhoneDisplay();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <img
            src="/images/branding/logo.png"
            alt={businessConfig.name}
            width="584"
            height="372"
            className="site-footer__logo"
            loading="lazy"
          />
          <p className="site-footer__name">{businessConfig.name}</p>
          <p className="site-footer__tagline">{businessConfig.tagline}</p>
          <p className="site-footer__blurb">
            A water purification business in {businessConfig.city},{" "}
            {businessConfig.state}, offering RO water purifiers, LifeCore
            alkaline water ionizers, installation and RO service support.
          </p>
        </div>

        <nav className="site-footer__column" aria-label="Footer navigation">
          <h2 className="site-footer__heading">Explore</h2>
          <ul className="site-footer__list">
            {footerNavigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__column">
          <h2 className="site-footer__heading">Contact</h2>
          <ul className="site-footer__list site-footer__list--contact">
            <li>
              <Icon name="phone" size={16} />
              {callLink ? (
                <a href={callLink}>{getPhoneDisplay()}</a>
              ) : (
                <span>{businessConfig.phoneDisplay}</span>
              )}
            </li>
            <li>
              <Icon name="whatsapp" size={16} />
              {whatsappLink ? (
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  {whatsappDisplay}
                </a>
              ) : (
                <span>{businessConfig.whatsappDisplay}</span>
              )}
            </li>
            <li>
              <Icon name="location" size={16} />
              <address className="site-footer__address">
                {businessConfig.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </li>
            <li>
              <Icon name="clock" size={16} />
              <span>{businessConfig.businessHours}</span>
            </li>
            <li>
              <Icon name="instagram" size={16} />
              <a
                href={businessConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {businessConfig.social.instagramHandle}
              </a>
            </li>
          </ul>
        </div>

        <div className="site-footer__column">
          <h2 className="site-footer__heading">Product Categories</h2>
          <ul className="site-footer__list">
            <li>
              <Link to={ROUTES.roProducts}>RO Water Purifiers</Link>
            </li>
            <li>
              <Link to={ROUTES.alkalineProducts}>Alkaline Water Ionizers</Link>
            </li>
            <li>
              <Link to={ROUTES.service}>RO Service &amp; Repair</Link>
            </li>
          </ul>
          <p className="site-footer__note">
            Prices are shared on request. Message us for the current price of any
            product.
          </p>
        </div>
      </div>

      <div className="site-footer__bar">
        <div className="container site-footer__bar-inner">
          <p className="site-footer__copy">
            © {year} {businessConfig.name}. All rights reserved.
          </p>
          <ul className="site-footer__legal">
            {legalNavigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
