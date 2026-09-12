import { Link } from "react-router-dom";
import Icon from "./Icon";
import { classNames } from "../../utils/helpers";

/**
 * One button component for the whole site.
 * Renders a <Link> when `to` is given, an <a> when `href` is given and a real
 * <button> otherwise — never a clickable div.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  icon,
  iconAfter,
  block = false,
  className,
  external = false,
  ...rest
}) {
  const classes = classNames(
    "btn",
    `btn--${variant}`,
    size !== "md" && `btn--${size}`,
    block && "btn--block",
    className,
  );

  const content = (
    <>
      {icon ? <Icon name={icon} size={size === "lg" ? 20 : 18} /> : null}
      <span>{children}</span>
      {iconAfter ? (
        <Icon name={iconAfter} size={size === "lg" ? 20 : 18} />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
