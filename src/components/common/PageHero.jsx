import Breadcrumbs from "./Breadcrumbs";

/** Standard hero block used at the top of every inner page. */
export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  variant = "light",
  children,
}) {
  const isNavy = variant === "navy";

  return (
    <section className={`page-hero${isNavy ? " page-hero--navy" : ""}`}>
      <div className="container">
        {breadcrumbs?.length ? (
          <div className="page-hero__breadcrumbs">
            <Breadcrumbs items={breadcrumbs} light={isNavy} />
          </div>
        ) : null}
        <div className="page-hero__inner">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1 className="page-hero__title">{title}</h1>
          {description ? (
            <p className="page-hero__description">{description}</p>
          ) : null}
          {actions ? <div className="page-hero__actions">{actions}</div> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
