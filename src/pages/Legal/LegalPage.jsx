import PageHero from "../../components/common/PageHero";
import DemoNotice from "../../components/common/DemoNotice";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { businessConfig } from "../../config/business";
import { ROUTES } from "../../config/navigation";
import "./LegalPage.css";

/**
 * Placeholder legal pages.
 * Deliberately not written as finished legal text — the agency should have the
 * final wording reviewed before launch. Section headings are in place so the
 * content can be dropped straight in.
 */

const CONTENT = {
  privacy: {
    title: "Privacy Policy",
    description:
      "How Tejas Agency handles the information you share through this website.",
    path: ROUTES.privacy,
    sections: [
      {
        heading: "Information we collect",
        body: "[Describe what is collected through the enquiry form and WhatsApp — typically name, phone number and the requirement you describe.]",
      },
      {
        heading: "How the information is used",
        body: "[Describe how enquiries are used: responding to your enquiry, arranging installation or service, and nothing else.]",
      },
      {
        heading: "Sharing with others",
        body: "[State whether any information is shared with third parties, for example a service technician or manufacturer.]",
      },
      {
        heading: "Data retention",
        body: "[State how long enquiry details are kept.]",
      },
      {
        heading: "Your choices",
        body: "[Explain how a customer can ask for their details to be removed.]",
      },
      {
        heading: "Contact",
        body: `[Contact details for privacy questions — currently ${businessConfig.phoneDisplay}.]`,
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    description:
      "The terms that apply when you use this website and enquire with Tejas Agency.",
    path: ROUTES.terms,
    sections: [
      {
        heading: "About this website",
        body: "[State that the website provides product information and a way to contact the business.]",
      },
      {
        heading: "Product information",
        body: "[Note that product details, specifications and availability may change, and that the details confirmed at the time of purchase apply.]",
      },
      {
        heading: "Pricing",
        body: "[Explain that prices are shared on request and may vary with model, offers and installation requirements.]",
      },
      {
        heading: "Warranty and service",
        body: "[Explain how manufacturer warranty and the agency's service support work.]",
      },
      {
        heading: "Limitation of liability",
        body: "[To be drafted with professional advice.]",
      },
      {
        heading: "Contact",
        body: `[Contact details for questions about these terms — currently ${businessConfig.phoneDisplay}.]`,
      },
    ],
  },
};

export default function LegalPage({ type = "privacy" }) {
  const content = CONTENT[type] ?? CONTENT.privacy;

  useDocumentMeta({
    title: content.title,
    description: content.description,
    path: content.path,
  });

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={content.title}
        description={content.description}
        breadcrumbs={[
          { label: "Home", to: ROUTES.home },
          { label: content.title },
        ]}
      />

      <section className="section">
        <div className="container container--narrow">
          <DemoNotice>
            Placeholder document: this page shows the structure only. The final
            wording must be supplied by {businessConfig.name} and reviewed before
            the website goes live.
          </DemoNotice>

          <div className="legal-body">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
