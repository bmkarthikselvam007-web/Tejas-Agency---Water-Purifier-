import Accordion from "../common/Accordion";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";
import { EmptyState } from "../common/States";
import { ROUTES } from "../../config/navigation";
import "./FaqSection.css";

/**
 * Reusable FAQ block: used on the homepage, the category pages, the service
 * page and the FAQ page itself. Items always come from the FAQ service.
 */
export default function FaqSection({
  items = [],
  eyebrow = "FAQ",
  title = "Frequently asked questions",
  description,
  showViewAll = true,
  className = "section section--soft",
  narrow = true,
}) {
  return (
    <section className={className}>
      <div className={`container${narrow ? " container--narrow" : ""}`}>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={narrow ? "center" : "left"}
        />

        {items.length ? (
          <Accordion items={items} defaultOpenId={items[0]?.id} />
        ) : (
          <EmptyState
            icon="guide"
            title="No questions in this section yet"
            description="Try another category, or contact us with your question directly."
          />
        )}

        {showViewAll ? (
          <div className="faq-section__action">
            <Button to={ROUTES.faq} variant="secondary" iconAfter="arrowRight">
              View All FAQs
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
