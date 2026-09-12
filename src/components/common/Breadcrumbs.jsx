import { Link } from "react-router-dom";
import Icon from "./Icon";
import "./Breadcrumbs.css";

/**
 * Reusable breadcrumb trail.
 * @param {Array<{label: string, to?: string}>} items - last item is the current page
 */
export default function Breadcrumbs({ items = [], light = false }) {
  if (!items.length) return null;

  return (
    <nav
      className={`breadcrumbs${light ? " breadcrumbs--light" : ""}`}
      aria-label="Breadcrumb"
    >
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li className="breadcrumbs__item" key={`${item.label}-${index}`}>
              {isLast || !item.to ? (
                <span aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
              {!isLast ? (
                <Icon
                  name="chevronRight"
                  size={14}
                  className="breadcrumbs__separator"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
