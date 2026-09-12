import Icon from "../common/Icon";
import "./ProductFilters.css";

/**
 * Filter bar for a product listing.
 * Options are passed in from the service layer, so new products extend the
 * filters automatically.
 */
export default function ProductFilters({
  options = { technologies: [], waterSources: [] },
  value = { technology: "all", waterSource: "all" },
  onChange,
  resultCount = 0,
  totalCount = 0,
}) {
  const update = (patch) => onChange?.({ ...value, ...patch });
  const isFiltered =
    value.technology !== "all" || value.waterSource !== "all";

  return (
    <div className="product-filters">
      <div className="product-filters__group">
        <span className="product-filters__label" id="filter-technology-label">
          Technology
        </span>
        <div
          className="product-filters__chips"
          role="group"
          aria-labelledby="filter-technology-label"
        >
          <button
            type="button"
            className={`filter-chip${value.technology === "all" ? " filter-chip--active" : ""}`}
            onClick={() => update({ technology: "all" })}
            aria-pressed={value.technology === "all"}
          >
            All
          </button>
          {options.technologies.map((tech) => (
            <button
              key={tech}
              type="button"
              className={`filter-chip${value.technology === tech ? " filter-chip--active" : ""}`}
              onClick={() => update({ technology: tech })}
              aria-pressed={value.technology === tech}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {options.waterSources.length ? (
        <div className="product-filters__group product-filters__group--select">
          <label className="product-filters__label" htmlFor="filter-water-source">
            Water source
          </label>
          <select
            id="filter-water-source"
            className="product-filters__select"
            value={value.waterSource}
            onChange={(event) => update({ waterSource: event.target.value })}
          >
            <option value="all">All sources</option>
            {options.waterSources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="product-filters__meta">
        <span className="product-filters__count">
          Showing <strong>{resultCount}</strong> of {totalCount} products
        </span>
        {isFiltered ? (
          <button
            type="button"
            className="product-filters__clear"
            onClick={() => onChange?.({ technology: "all", waterSource: "all" })}
          >
            <Icon name="close" size={14} />
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  );
}
