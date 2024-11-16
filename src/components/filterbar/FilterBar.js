import { useState } from "react";
import "./FilterBar.scss";

const FilterBar = ({ options, onFilterSelect, initialSelected = 0 }) => {
  const [selected, setSelected] = useState(initialSelected);

  const handleFilterClick = (index) => {
    setSelected(index);
    onFilterSelect(index);
  };

  return (
    <section className="filter-bar">
      <span className="filter-bar__label">Filter By:</span>
      <ul className="filter-bar__list">
        {options.map((option, index) => (
          <li
            key={index}
            className={`filter-bar__item ${selected === index ? "selected" : ""}`}
            onClick={() => handleFilterClick(index)}
            tabIndex={0}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </section>
  );
};
export default FilterBar;
