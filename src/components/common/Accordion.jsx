import { useId, useState } from "react";
import Icon from "./Icon";
import "./Accordion.css";

/**
 * Accessible accordion built on real buttons + aria-expanded / aria-controls.
 * @param {Array<{id: string|number, question: string, answer: string}>} items
 */
export default function Accordion({ items = [], defaultOpenId = null }) {
  const [openId, setOpenId] = useState(defaultOpenId);
  const baseId = useId();

  if (!items.length) return null;

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-panel-${item.id}`;
        const buttonId = `${baseId}-button-${item.id}`;

        return (
          <div
            className={`accordion__item${isOpen ? " accordion__item--open" : ""}`}
            key={item.id}
          >
            <h3 className="accordion__heading">
              <button
                type="button"
                className="accordion__trigger"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>{item.question}</span>
                <Icon name="chevronDown" size={20} className="accordion__icon" />
              </button>
            </h3>
            <div
              className="accordion__panel"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              <div className="accordion__panel-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
