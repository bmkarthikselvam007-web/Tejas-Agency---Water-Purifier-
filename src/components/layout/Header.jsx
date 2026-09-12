import { useState } from "react";
import { Link } from "react-router-dom";
import DesktopNav from "../navigation/DesktopNav";
import MobileNav from "../navigation/MobileNav";
import Icon from "../common/Icon";
import {
  WhatsAppButton,
  CallButton,
  InstagramButton,
} from "../common/ContactButtons";
import { businessConfig } from "../../config/business";
import { useScrolled } from "../../hooks/useScrollPosition";
import { ROUTES } from "../../config/navigation";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(10);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <div className="container site-header__inner">
        <Link to={ROUTES.home} className="site-header__brand">
          <img
            src="/images/branding/logo.png"
            alt=""
            width="584"
            height="372"
            className="site-header__logo"
          />
          <span className="site-header__brand-text">
            <span className="site-header__brand-name">{businessConfig.name}</span>
            <span className="site-header__brand-tagline">
              Water Purification · {businessConfig.city}
            </span>
          </span>
        </Link>

        <DesktopNav />

        <div className="site-header__actions">
          <div className="site-header__ctas">
            {/* Dropped below 1240px so the navigation never wraps */}
            <div className="site-header__cta-call">
              <CallButton size="sm" variant="secondary" />
            </div>
            <WhatsAppButton size="sm">WhatsApp</WhatsAppButton>
            <InstagramButton
              size="sm"
              className="btn--icon"
              aria-label={`${businessConfig.name} on Instagram (${businessConfig.social.instagramHandle})`}
              title={`Instagram · ${businessConfig.social.instagramHandle}`}
            />
          </div>
          <button
            type="button"
            className="site-header__menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Icon name="menu" size={24} />
          </button>
        </div>
      </div>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
