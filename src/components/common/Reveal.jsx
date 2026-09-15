import { classNames } from "../../utils/helpers";
import { useScrollReveal } from "../../hooks/useScrollReveal";

/**
 * Fades its content up as it scrolls into view.
 *
 * `variant="group"` staggers the element's direct children instead of moving
 * the element as a whole — use it on grids and lists so items arrive in
 * sequence. Renders as `as` with no extra wrapper, so existing layout classes
 * can be passed straight through.
 */
export default function Reveal({
  as: Tag = "div",
  variant = "single",
  delay = 0,
  className,
  children,
  ...rest
}) {
  const [ref, visible] = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={classNames(
        variant === "group" ? "reveal-group" : "reveal",
        visible && "is-visible",
        className,
      )}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
