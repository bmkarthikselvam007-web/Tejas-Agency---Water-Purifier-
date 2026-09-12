import { useState } from "react";
import PageHero from "../../components/common/PageHero";
import Accordion from "../../components/common/Accordion";
import { EmptyState } from "../../components/common/States";
import { FinalCTA } from "../../components/home/HomeSections";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { getFaqCategories, getFaqs } from "../../services/faqService";
import { ROUTES } from "../../config/navigation";
import "../../components/home/Home.css";
import "./FAQ.css";

export default function FAQ() {
  useDocumentMeta({
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about RO water purifiers, alkaline water ionizers, installation and RO service in Madurai.",
    path: ROUTES.faq,
  });

  const [category, setCategory] = useState("all");
  const categories = getFaqCategories();
  const { data: faqs, loading } = useAsyncData(
    () => getFaqs({ category }),
    [category],
    [],
  );

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Questions customers ask most often about purifiers, ionizers, installation and service. If your question is not here, message us — we will answer it directly."
        breadcrumbs={[{ label: "Home", to: ROUTES.home }, { label: "FAQ" }]}
      />

      <section className="section">
        <div className="container container--narrow">
          <div
            className="faq-filters"
            role="group"
            aria-label="Filter questions by category"
          >
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`filter-chip${category === item.id ? " filter-chip--active" : ""}`}
                onClick={() => setCategory(item.id)}
                aria-pressed={category === item.id}
              >
                {item.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="faq-skeleton">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="skeleton"
                  style={{ height: 62, borderRadius: 8 }}
                />
              ))}
            </div>
          ) : faqs?.length ? (
            <Accordion items={faqs} defaultOpenId={faqs[0]?.id} />
          ) : (
            <EmptyState
              icon="guide"
              title="No questions in this category yet"
              description="Try another category, or send us your question on WhatsApp."
            />
          )}
        </div>
      </section>

      <FinalCTA
        title="Still have a question?"
        description="Send it to us on WhatsApp or call — we would rather answer it than have you guess."
      />
    </>
  );
}
