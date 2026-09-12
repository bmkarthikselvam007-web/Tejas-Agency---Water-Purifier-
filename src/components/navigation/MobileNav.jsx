import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import Icon from "../common/Icon";
import {
  WhatsAppButton,
  CallButton,
  InstagramButton,
} from "../common/ContactButtons";
import { mainNavigation } from "../../config/navigation";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { businessConfig } from "../../config/business";
import { getPhoneDisplay } from "../../utils/phone";

/** Slide-in mobile drawer with an expandable Products submenu. */
export default function MobileNav({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);
  const location = useLocation();

  useLockBodyScroll(open);

  // Close the drawer after a navigation (not on the initial mount).
  const lastPath = useRef(location.pathname);
  useEffect(() => {
    if (lastPath.current === location.pathname) return;
    lastPath.current = location.pathname;
    onClose?.();
  }, [location.pathname, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  /**
   * Rendered through a portal on <body>.
   * The header uses backdrop-filter, which makes it a containing block for
   * fixed-position descendants — the drawer would otherwise be clipped to the
   * height of the header instead of covering the viewport.
   */
  return createPortal(
    <>
      <div
        className={`mobile-nav__overlay${open ? " mobile-nav__overlay--visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`mobile-nav${open ? " mobile-nav--open" : ""}`}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
      >
        <div className="mobile-nav__header">
          <span className="mobile-nav__title">Menu</span>
          <button
            type="button"
            className="mobile-nav__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="mobile-nav__body">
          <ul className="mobile-nav__list">
            {mainNavigation.map((item) => {
              if (!item.children) {
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        `mobile-nav__link${isActive ? " mobile-nav__link--active" : ""}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              }

              const isExpanded = expanded === item.label;
              return (
                <li key={item.to}>
                  <button
                    type="button"
                    className="mobile-nav__link mobile-nav__link--toggle"
                    aria-expanded={isExpanded}
                    aria-controls="mobile-products-submenu"
                    onClick={() => setExpanded(isExpanded ? null : item.label)}
                  >
                    {item.label}
                    <Icon
                      name="chevronDown"
                      size={18}
                      className={`mobile-nav__chevron${
                        isExpanded ? " mobile-nav__chevron--open" : ""
                      }`}
                    />
                  </button>
                  <ul
                    className="mobile-nav__sublist"
                    id="mobile-products-submenu"
                    hidden={!isExpanded}
                  >
                    <li>
                      <NavLink to={item.to} className="mobile-nav__sublink">
                        All Products
                      </NavLink>
                    </li>
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <NavLink to={child.to} className="mobile-nav__sublink">
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-nav__footer">
          <WhatsAppButton block size="lg" />
          <InstagramButton block size="lg" />
          <CallButton block size="lg" />
          <p className="mobile-nav__meta">
            {businessConfig.name} · {businessConfig.city}
            <br />
            {getPhoneDisplay()}
          </p>
        </div>
      </div>
    </>,
    document.body,
  );
}
