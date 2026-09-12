import {
  WhatsAppButton,
  CallButton,
  InstagramButton,
} from "../common/ContactButtons";
import Button from "../common/Button";
import Icon from "../common/Icon";
import { businessConfig } from "../../config/business";
import { ROUTES } from "../../config/navigation";

const highlights = [
  { icon: "location", label: `Based in ${businessConfig.city}` },
  { icon: "layers", label: "RO purifiers & water ionizers" },
  { icon: "wrench", label: "Installation & service support" },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="eyebrow">
            {businessConfig.city}, {businessConfig.state}
          </span>
          <h1 className="hero__title">
            Trusted Water Purification Solutions for Madurai Homes
          </h1>
          <p className="hero__description">
            Explore quality RO water purifiers and LifeCore alkaline water
            ionizers with expert guidance, installation and service support.
          </p>

          <div className="hero__actions">
            <WhatsAppButton size="lg">WhatsApp Us</WhatsAppButton>
            <InstagramButton size="lg" />
            <CallButton size="lg" variant="dark" />
          </div>

          <ul className="hero__highlights">
            {highlights.map((item) => (
              <li key={item.label}>
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>

          <div className="hero__links">
            <Button to={ROUTES.roProducts} variant="ghost" iconAfter="arrowRight">
              Browse RO Purifiers
            </Button>
            <Button
              to={ROUTES.alkalineProducts}
              variant="ghost"
              iconAfter="arrowRight"
            >
              Browse Water Ionizers
            </Button>
          </div>
        </div>

        <div className="hero__media">
          <img
            src="/images/branding/hero.svg"
            alt="Illustration of an RO water purifier and an alkaline water ionizer"
            width="900"
            height="700"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
