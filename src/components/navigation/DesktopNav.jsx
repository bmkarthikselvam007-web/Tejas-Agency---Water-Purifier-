import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Icon from "../common/Icon";
import { mainNavigation } from "../../config/navigation";

/**
 * Desktop navigation with a keyboard-accessible Products dropdown.
 * Opens on hover and on click/Enter; closes on Escape, outside click and on
 * route change.
 */
export default function DesktopNav() {
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);
  const closeTimer = useRef(null);
  const location = useLocation();

  // Close the dropdown when the route changes (adjusted during render rather
  // than in an effect, so the menu never flashes open on the new page).
  const [lastPath, setLastPath] = useState(location.pathname);
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    setOpenMenu(null);
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    const onClickOutside = (event) => {
      if (!navRef.current?.contains(event.target)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const open = (label) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  return (
    <nav className="desktop-nav" aria-label="Main navigation" ref={navRef}>
      <ul className="desktop-nav__list">
        {mainNavigation.map((item) => {
          if (!item.children) {
            return (
              <li key={item.to} className="desktop-nav__item">
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `desktop-nav__link${isActive ? " desktop-nav__link--active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            );
          }

          const isOpen = openMenu === item.label;
          const sectionActive = location.pathname.startsWith(item.to);

          return (
            <li
              key={item.to}
              className="desktop-nav__item desktop-nav__item--has-menu"
              onMouseEnter={() => open(item.label)}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className={`desktop-nav__link desktop-nav__trigger${
                  sectionActive ? " desktop-nav__link--active" : ""
                }`}
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={() => (isOpen ? setOpenMenu(null) : open(item.label))}
              >
                {item.label}
                <Icon
                  name="chevronDown"
                  size={16}
                  className="desktop-nav__chevron"
                />
              </button>

              <div
                className={`desktop-nav__menu${isOpen ? " desktop-nav__menu--open" : ""}`}
                hidden={!isOpen}
              >
                <ul className="desktop-nav__menu-list">
                  <li>
                    <NavLink to={item.to} className="desktop-nav__menu-link">
                      <span className="desktop-nav__menu-label">
                        All Products
                      </span>
                      <span className="desktop-nav__menu-description">
                        Browse both product categories
                      </span>
                    </NavLink>
                  </li>
                  {item.children.map((child) => (
                    <li key={child.to}>
                      <NavLink to={child.to} className="desktop-nav__menu-link">
                        <span className="desktop-nav__menu-label">
                          {child.label}
                        </span>
                        <span className="desktop-nav__menu-description">
                          {child.description}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
