import { memo } from "react";
import "./css/CategoryItemsContainer.css";

import { useSelector } from "react-redux";
import { getServicesHeadings } from "../../STORE/selectors";


import ItemsContainer from "./ItemsContainer";

const CategoryItemsContainer: React.FC = () => {
  const itemsHeading = useSelector(getServicesHeadings)?.headings?.itemsHeading;

  return (
    <>
      <h3 className={"heading"}>{itemsHeading || "Pick A Service"}</h3>

      <div id={"category-items-container"}>
        <ItemsContainer />
      </div>
    </>
  );
};

export default memo(CategoryItemsContainer);
