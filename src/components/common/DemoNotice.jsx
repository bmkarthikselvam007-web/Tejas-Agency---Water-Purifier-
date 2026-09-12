import Icon from "./Icon";
import "./DemoNotice.css";

/**
 * Visible marker for placeholder content.
 * Used wherever demo data is shown so nothing on screen can be mistaken for
 * genuine business information during the frontend review.
 */
export default function DemoNotice({
  children = "Demo content - to be replaced with the information supplied by Tejas Agency.",
  variant = "banner",
}) {
  if (variant === "chip") {
    return (
      <span className="demo-chip">
        <Icon name="sparkle" size={13} />
        Demo data
      </span>
    );
  }

  return (
    <p className="demo-notice" role="note">
      <Icon name="sparkle" size={16} />
      <span>{children}</span>
    </p>
  );
}
