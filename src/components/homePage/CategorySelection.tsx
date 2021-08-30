import React, { useRef, memo, useState } from "react";
import "./css/CategorySelection.css";
import { CSSTransition } from "react-transition-group";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";

import Categories from "./Categories";
import {
  getServicesHeadings,
  getActiveCategoryDetails,
} from "../../STORE/selectors";

const CategorySelection = () => {
  const categoriesHeading =
    useSelector(getServicesHeadings)?.headings?.categoriesHeading;
  const title = useSelector(getActiveCategoryDetails)?.title;
  const [showCategory, setShowCategory] = useState(false);

  const searchTitleContainerRef = useRef<HTMLDivElement>(null);
  const searchItemsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <h3 className={"heading"}>{categoriesHeading || "Pick A Category"}</h3>
      <div
        id={"selection-search-container"}
        ref={searchTitleContainerRef}
        className={"no-select"}
      >
        <div
          id={"selection-search"}
          onClick={() => setShowCategory(!showCategory)}
        >
          <span>{title ? title : "Select"}</span>
          <FaChevronDown />
        </div>

        <CSSTransition
          nodeRef={searchItemsRef}
          in={showCategory}
          timeout={300}
          classNames="css-transition-height"
          unmountOnExit
          appear
        >
          <div
            ref={searchItemsRef}
            id={"selection-search-items-container"}
            className={"no-select"}
          >
            <Categories
              showCategory={showCategory}
              setShowCategory={setShowCategory}
              searchTitleContainerRef={searchTitleContainerRef}
            />
          </div>
        </CSSTransition>
      </div>
    </>
  );
};
export default memo(CategorySelection);
