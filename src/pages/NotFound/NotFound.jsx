import { Link } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import Button from "../../components/common/Button";
import { WhatsAppButton } from "../../components/common/ContactButtons";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { ROUTES } from "../../config/navigation";
import "./NotFound.css";

const suggestions = [
  { label: "RO Water Purifiers", to: ROUTES.roProducts },
  { label: "Alkaline Water Ionizers", to: ROUTES.alkalineProducts },
  { label: "RO Service & Repair", to: ROUTES.service },
  { label: "Contact us", to: ROUTES.contact },
];

export default function NotFound() {
  useDocumentMeta({
    title: "Page not found",
    description:
      "The page you are looking for does not exist. Browse our products or contact Tejas Agency in Madurai.",
  });

  return (
    <>
      <PageHero
        eyebrow="404"
        title="This page does not exist"
        description="The link may be out of date, or the page may have moved. Here are a few places that might help."
        actions={
          <>
            <Button to={ROUTES.home} variant="primary">
              Back to home
            </Button>
            <WhatsAppButton variant="secondary">Ask on WhatsApp</WhatsAppButton>
          </>
        }
      />

      <section className="section">
        <div className="container container--narrow">
          <h2 className="not-found__heading">Popular pages</h2>
          <ul className="not-found__links">
            {suggestions.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
