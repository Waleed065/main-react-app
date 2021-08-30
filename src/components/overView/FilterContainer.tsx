import React, { useEffect, useRef, useState } from "react";
import "./css/FilterContainer.css";

import { useSelector } from "react-redux";
import { getServicesSearchTitle } from "../../STORE/selectors";
import formattedTitle from "../../utils/formattedTitle";
import { Button, Drawer, IconButton, makeStyles } from "@material-ui/core";
import SearchCountry from "../SearchCountry";
import SearchCity from "../SearchCity";
import Service from "../Service";
import SortBy from "../SortBy";
import FilterBy from "../FilterBy";
import { GoSettings } from "react-icons/go";
import ChooseARange from "./ChooseARange";
import { useParams } from "react-router";

// import FilterModal from "../../screens/FilterModal";

export default function FilterContainer() {
  const classes = useStyles();
  const {
    cityId,
    serviceId,
    // category,
  } = useSelector(getServicesSearchTitle).servicesTitle;
  const {tabParam, countryParam, cityParam} = useParams<any>();

  const [showFilter, setShowFilter] = useState(false);
  const [drawerStuff, setDrawerStuff] = useState<any>({
    anchor: "left",
    variant: "permanent",
  });

  const currentVariant = useRef(drawerStuff.variant);
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= 860) {
        if (currentVariant.current === "permanent") {
          setDrawerStuff({
            anchor: "bottom",
            variant: "temporary",
          });
          currentVariant.current = "temporary";
        }
      } else {
        if (currentVariant.current === "temporary") {
          setDrawerStuff({
            anchor: "left",
            variant: "permanent",
          });
          currentVariant.current = "permanent";
          setShowFilter(false);
        }
      }
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isPermanent = drawerStuff.variant === "permanent";

  return (
    <>
      {!isPermanent && (
        <div id={"ourServices-items-filter-tab-shab"}>
          <span className={"ourServices-items-filter-flex-box"}>
            <label>Location</label>
            <p className={"p-class"}>{`${formattedTitle(cityParam)}/${formattedTitle(countryParam)}`}</p>
          </span>

          <span className={"ourServices-items-filter-flex-box"}>
            <label>{formattedTitle(tabParam)}</label>
          </span>

          <IconButton onClick={() => setShowFilter(!showFilter)}>
            <GoSettings color={"var(--primaryThemeColor)"} />
          </IconButton>
        </div>
      
      )}

      <Drawer
        anchor={drawerStuff.anchor}
        variant={drawerStuff.variant}
        className={isPermanent ? classes.drawer : undefined}
        classes={
          isPermanent
            ? {
                paper: classes.drawerPaper,
              }
            : undefined
        }
        open={isPermanent ? true : showFilter}
        onClose={() => (isPermanent ? null : setShowFilter(false))}
      >
        <div id={"ourServices-items-filter-container"}>
          <div>
            <h3>
              {formattedTitle(serviceId)} services in {formattedTitle(cityId)}
            </h3>

            <div id={"ourServices-items-filter-sub-container"}>
              <h3>Sort By</h3>
              <SortBy />
            </div>
            <div id={"ourServices-items-filter-sub-container"}>
              <h3>Filter By</h3>
              <FilterBy/>
            </div>

            <div id={"ourServices-items-filter-sub-container"}>
              <h3>Price</h3>
              <p className={"p-class"}>Choose a range</p>
              <ChooseARange />
            </div>

            <div id={"ourServices-items-filter-sub-container"}>
              <h3>Service</h3>
              <Service />
            </div>
            <div id={"ourServices-items-filter-sub-container"}>
              <h3>Country</h3>
              <SearchCountry />
            </div>
            <div id={"ourServices-items-filter-sub-container"}>
              <h3>City</h3>
              <SearchCity />
            </div>
          </div>
          <div id={"ourServices-items-filter-bottom-box"}>
            <span className={"ourServices-items-filter-flex-box"}>
              <p className={"p-class"}>Showing results for </p>
              <label>{formattedTitle(serviceId)}</label>
            </span>
          </div>

          {!isPermanent && (
            <Button
              variant="outlined"
              color={"primary"}
              onClick={() => setShowFilter(false)}
              style={{ marginTop: 10 }}
            >
              Cancel
            </Button>
          )}
        </div>
      </Drawer>
    
    </>
  );
}

const useStyles = makeStyles({
  drawer: {
    width: 300,
    flexShrink: 0,
  },
  drawerPaper: {
    top: "var(--navbarHeight)" || 70,
    bottom: 0,
    width: 300,
    zIndex: 1
  },
});
