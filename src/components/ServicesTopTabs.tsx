import { memo, forwardRef} from "react";

import "./css/ServicesTopTabs.css";

// import { FaEllipsisV } from "react-icons/fa";
import { IconContext, IconBaseProps } from "react-icons";

type schema = {
  isActive: boolean;
  tabTitle: string;
  icon: IconBaseProps;
  onClick: (arg: string) => void
  // showMore?: boolean;

  // showMoreServiceIds: boolean;
  // setShowMoreServiceIds: (arg: boolean) => void;
};
type RefType = HTMLDivElement | null;

const ServicesTopTabs = forwardRef<RefType, schema>(
  (
    {
      isActive,
      tabTitle,
      icon,
      onClick,
      // showMore,
      // showMoreServiceIds,
      // setShowMoreServiceIds,
    },
    ref
  ) => {
    
    
    return (
      <IconContext.Provider value={{ size: "22px" }}>
        <div
          ref={ref}
          className={`services-tabs ${
            isActive ? "active-services-tab" : "inactive-services-tab"
          }`}
        >
          <div
            className={"services-tabs-details"}
            onClick={() => onClick(tabTitle)}
          >
            <span>{icon}</span>
            <span>
              {tabTitle.charAt(0).toUpperCase() +
                tabTitle.slice(1).toLowerCase()}
            </span>
          </div>

          {/* {showMore && (
            <span
              title={"moreTabs"}
              className={`button services-tabs-more ${
                showMoreServiceIds ? "tabs-more-active" : undefined
              }`}
              onClick={() => setShowMoreServiceIds(!showMoreServiceIds)}
            >
              <FaEllipsisV title={"moreTabs"} />
            </span>
          )} */}
        </div>
      </IconContext.Provider>
    );
  }
);

export default memo(ServicesTopTabs);
