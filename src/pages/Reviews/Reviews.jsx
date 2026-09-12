import { useState } from "react";
import PageHero from "../../components/common/PageHero";
import ReviewCard from "../../components/reviews/ReviewCard";
import Rating from "../../components/common/Rating";
import DemoNotice from "../../components/common/DemoNotice";
import { EmptyState } from "../../components/common/States";
import { FinalCTA } from "../../components/home/HomeSections";
import Icon from "../../components/common/Icon";
import { PendingLinkButton } from "../../components/common/ContactButtons";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import {
  getReviewFilters,
  getReviews,
  getReviewSummary,
} from "../../services/reviewService";
import { businessConfig } from "../../config/business";
import { ROUTES } from "../../config/navigation";
import "../../components/home/Home.css";
import "./Reviews.css";

export default function Reviews() {
  useDocumentMeta({
    title: "Customer Reviews",
    description:
      "Customer reviews for Tejas Agency, Madurai. This demo build shows placeholder reviews until genuine customer feedback is published.",
    path: ROUTES.reviews,
  });

  const [topic, setTopic] = useState("all");
  const filters = getReviewFilters();

  const reviews = useAsyncData(() => getReviews({ topic }), [topic], []);
  const summary = useAsyncData(getReviewSummary, [], null);

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What customers say about Tejas Agency"
        description={`Feedback from customers in ${businessConfig.city} about products, installation and service.`}
        breadcrumbs={[{ label: "Home", to: ROUTES.home }, { label: "Reviews" }]}
      />

      <section className="section">
        <div className="container">
          {summary.data?.isDemoData ? (
            <DemoNotice>
              Demo reviews: the entries below are placeholder content used to
              design this page. They are not genuine customer reviews. Real
              reviews will replace them before launch.
            </DemoNotice>
          ) : null}

          {summary.data ? (
            <div className="reviews-hero-summary">
              <div className="reviews-hero-summary__score">
                <span className="reviews-hero-summary__value">
                  {summary.data.averageRating.toFixed(1)}
                </span>
                <Rating value={summary.data.averageRating} size={18} />
                <span className="reviews-hero-summary__count">
                  Based on {summary.data.total} demo reviews
                </span>
              </div>
              <p className="reviews-hero-summary__note">
                Once the business collects genuine reviews, this summary will be
                calculated from real customer ratings through the same service
                layer.
              </p>
            </div>
          ) : null}

          <section className="google-reviews" aria-labelledby="google-reviews-title">
            <span className="google-reviews__icon" aria-hidden="true">
              <Icon name="google" size={24} />
            </span>
            <div className="google-reviews__text">
              <h2 className="google-reviews__title" id="google-reviews-title">
                Reviews on Google
              </h2>
              <p className="google-reviews__description">
                Our Google Business Profile link will be published here. Once it
                is connected, these buttons open the live listing and real Google
                ratings replace the demo reviews below.
              </p>
            </div>
            <div className="google-reviews__actions">
              <PendingLinkButton
                url={businessConfig.googleReviewUrl}
                notice="Google Business Profile link not configured yet. Add it to src/config/business.js (googleReviewUrl) and this button opens the live listing."
                variant="primary"
                icon="google"
              >
                Read Google Reviews
              </PendingLinkButton>
              <PendingLinkButton
                url={businessConfig.googleWriteReviewUrl}
                notice="Google review link not configured yet. Add it to src/config/business.js (googleWriteReviewUrl) and this button opens the review form."
                variant="secondary"
                icon="star"
              >
                Write a Review
              </PendingLinkButton>
            </div>
          </section>

          <div
            className="reviews-filters"
            role="group"
            aria-label="Filter reviews by topic"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`filter-chip${topic === filter.id ? " filter-chip--active" : ""}`}
                onClick={() => setTopic(filter.id)}
                aria-pressed={topic === filter.id}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {reviews.loading ? (
            <div className="grid grid--3">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className="skeleton"
                  style={{ height: 220, borderRadius: 16 }}
                />
              ))}
            </div>
          ) : reviews.data?.length ? (
            <div className="grid grid--3">
              {reviews.data.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="star"
              title="No reviews in this category yet"
              description="Try another filter to see the other demo reviews."
            />
          )}
        </div>
      </section>

      <FinalCTA
        title="Bought from us? We would value your feedback."
        description="Once review collection is set up, customers will be able to share their experience here."
      />
    </>
  );
}
