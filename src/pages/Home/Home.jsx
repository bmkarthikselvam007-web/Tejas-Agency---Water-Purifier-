import Hero from "../../components/home/Hero";
import {
  CategorySection,
  ChooseGuide,
  FeaturedProducts,
  FinalCTA,
  ReviewsPreview,
  ServicePreview,
  TrustSection,
  WhyChooseUs,
} from "../../components/home/HomeSections";
import FaqSection from "../../components/faq/FaqSection";
import TechShowcase from "../../components/home/TechShowcase";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { getCategories } from "../../services/categoryService";
import { getFeaturedProducts } from "../../services/productService";
import { getServices, getTrustPoints } from "../../services/serviceService";
import { getReviews, getReviewSummary } from "../../services/reviewService";
import { getHomeFaqs } from "../../services/faqService";
import { businessConfig } from "../../config/business";
import "../../components/home/Home.css";

export default function Home() {
  useDocumentMeta({
    title: `RO Water Purifiers & Alkaline Water Ionizers in ${businessConfig.city}`,
    description:
      "Tejas Agency, Madurai — RO water purifiers, LifeCore alkaline water ionizers, installation and RO service support. Get expert guidance on WhatsApp or by phone.",
    path: "/",
  });

  const categories = useAsyncData(getCategories, [], []);
  const featured = useAsyncData(() => getFeaturedProducts(6), [], []);
  const services = useAsyncData(getServices, [], []);
  const reviews = useAsyncData(() => getReviews({ limit: 3 }), [], []);
  const reviewSummary = useAsyncData(getReviewSummary, [], null);
  const faqs = useAsyncData(() => getHomeFaqs(6), [], []);

  return (
    <>
      <Hero />

      <TrustSection points={getTrustPoints()} />

      <CategorySection
        categories={categories.data ?? []}
        loading={categories.loading}
      />

      <FeaturedProducts
        products={featured.data}
        loading={featured.loading}
        error={featured.error}
        onRetry={featured.reload}
      />

      <TechShowcase />

      <WhyChooseUs />

      <ChooseGuide />

      <ServicePreview services={services.data ?? []} loading={services.loading} />

      <ReviewsPreview
        reviews={reviews.data ?? []}
        summary={reviewSummary.data}
        loading={reviews.loading}
      />

      <FaqSection
        items={faqs.data ?? []}
        title="Frequently asked questions"
        description="Common questions about RO purifiers, water ionizers and service in Madurai."
        className="section"
      />

      <FinalCTA />
    </>
  );
}
