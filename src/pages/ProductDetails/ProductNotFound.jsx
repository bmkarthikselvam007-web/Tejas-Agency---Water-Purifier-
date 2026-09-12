import PageHero from "../../components/common/PageHero";
import Button from "../../components/common/Button";
import { EmptyState } from "../../components/common/States";
import { WhatsAppButton } from "../../components/common/ContactButtons";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { ROUTES } from "../../config/navigation";
import { whatsappMessages } from "../../utils/whatsapp";

/** Shown when a product slug does not resolve — never a blank page or a crash. */
export default function ProductNotFound({ categoryLabel, categoryTo, slug }) {
  useDocumentMeta({
    title: "Product not found",
    description:
      "The product you are looking for is not available. Browse our current range or contact Tejas Agency for help.",
  });

  return (
    <>
      <PageHero
        eyebrow="Product not found"
        title="We could not find that product"
        description={
          slug
            ? `No product matching "${slug}" exists in ${categoryLabel}. It may have been renamed or removed.`
            : `That product is not available in ${categoryLabel}.`
        }
        breadcrumbs={[
          { label: "Home", to: ROUTES.home },
          { label: "Products", to: ROUTES.products },
          { label: categoryLabel, to: categoryTo },
          { label: "Not found" },
        ]}
      />

      <section className="section">
        <div className="container container--narrow">
          <EmptyState
            icon="grid"
            title="Try the full catalogue instead"
            description="The product may be listed under a different name. You can browse the category, or message us and we will tell you whether we stock it."
            action={
              <div className="btn-group" style={{ justifyContent: "center" }}>
                <Button to={categoryTo} variant="primary">
                  Browse {categoryLabel}
                </Button>
                <WhatsAppButton
                  variant="secondary"
                  message={whatsappMessages.general()}
                >
                  Ask on WhatsApp
                </WhatsAppButton>
              </div>
            }
          />
        </div>
      </section>
    </>
  );
}
