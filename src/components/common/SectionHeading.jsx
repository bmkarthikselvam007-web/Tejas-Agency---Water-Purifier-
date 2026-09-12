import { classNames } from "../../utils/helpers";
import "./SectionHeading.css";

/**
 * Consistent section heading block: optional eyebrow, title, description and
 * an optional action rendered on the right at desktop widths.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  action,
  light = false,
  id,
}) {
  return (
    <div
      className={classNames(
        "section-heading",
        `section-heading--${align}`,
        light && "section-heading--light",
        action && "section-heading--with-action",
      )}
    >
      <div className="section-heading__text">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <Tag className="section-heading__title" id={id}>
          {title}
        </Tag>
        {description ? (
          <p className="section-heading__description">{description}</p>
        ) : null}
      </div>
      {action ? <div className="section-heading__action">{action}</div> : null}
    </div>
  );
}
