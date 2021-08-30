import React, { memo } from "react";
import "./css/Services.css";

import SearchLocation from "../ServicesLocation";
import CategorySelection from "./CategorySelection";
import CategoryItemsContainer from "./CategoryItemsContainer";
import { useEffectFetchData } from "../../utils/useEffectFetchData";
// import MoreTabs from "../MoreTabs";

function Services() {
  // const [showMoreServiceIds, setShowMoreServiceIds] = useState(false);

  // important
  useEffectFetchData();

  return (
    <>
      {/* <MoreTabs
        showMoreServiceIds={showMoreServiceIds}
        setShowMoreServiceIds={setShowMoreServiceIds}
      /> */}
      <div id={"services-action-container"}>

        <SearchLocation />

        <CategorySelection />
        <CategoryItemsContainer />
      </div>
    </>
  );
}

export default memo(Services);
