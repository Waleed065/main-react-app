import React, { useState, useEffect, useRef, memo } from "react";
// import "./css/AdTab.css";
import { CSSTransition } from "react-transition-group";
import { FaChevronDown, FaCcMastercard } from "react-icons/fa";

import TabOptions from "./TabOptions";

const options: string[] = ["Visa", "Master", "Paypal", "Unionpay", "Maestro"];

interface schema {
  currentTab: string;
  setCurrentTab: (arg: string) => void;
}
function SearchSelection({ currentTab, setCurrentTab }: schema) {
  const [showTabs, setShowTabs] = useState(false);
  const searchOptionsContainerRef = useRef<HTMLDivElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentTab(options[0]);
    // eslint-disable-next-line
  }, []);

  const onSelect = (tab: string) => {
    setCurrentTab(tab);
    setShowTabs(false);
  };

  return (
    <div ref={searchOptionsContainerRef} id={"postAd-tab-container"}>
      <div onClick={() => setShowTabs(!showTabs)} id={"postAd-tab"}>
        <FaChevronDown color={"var(--primaryThemeColor)"} />
        <label>{currentTab}</label>
      </div>

      <CSSTransition
        nodeRef={tabContainerRef}
        in={showTabs}
        timeout={300}
        classNames="css-transition-height"
        unmountOnExit
        appear
      >
        <div ref={tabContainerRef} id={"postAd-tabs-items-container"}>
          <TabOptions
            icon={<FaCcMastercard />}
            onSelect={onSelect}
            tabs={options}
            setShowTabs={setShowTabs}
            searchOptionsContainerRef={searchOptionsContainerRef}
          />
        </div>
      </CSSTransition>
    </div>
  );
}
export default memo(SearchSelection);
