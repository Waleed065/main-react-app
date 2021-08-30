import React, { useState, useEffect } from "react";
import "./css/NavBar.css";
import classNames from "classnames";
import { AppBar, Hidden, makeStyles } from "@material-ui/core";

import NavBarDrawer from "../NavBarDrawer";
import NavBarTemp from "./NavBarTemp";
import NavBarSecondary from "./NavBarSecondary";

interface schema {
  componentRef?: React.RefObject<HTMLDivElement>;
}

export default function NavBar({ componentRef }: schema) {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [secondaryNav, setSecondaryNav] = useState(false);
  const [isNavBarActive, setIsNavBarActive] = useState(false);

  useEffect(() => {
    if (!componentRef?.current) return;

    const options = {
      threshold: 0.9,
    };

    const navCheck = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          setIsNavBarActive(false);
        } else {
          setIsNavBarActive(true);
        }
      });
    };
    let observer = new IntersectionObserver(navCheck, options);
    observer.observe(componentRef.current);
    return () => observer.disconnect();
  }, [componentRef]);

  return (
    <>
      <AppBar
        className={classNames(
          classes.appBar,
          Boolean(componentRef?.current) &&
            !isNavBarActive &&
            classes.transparent
        )}
      >
        <NavBarTemp
          setMobileOpen={setMobileOpen}
          secondaryNav={secondaryNav}
          setSecondaryNav={setSecondaryNav}
        />
        <NavBarSecondary
          secondaryNav={secondaryNav}
          setSecondaryNav={setSecondaryNav}
        />
      </AppBar>

      <Hidden mdUp implementation="js">
        <NavBarDrawer open={mobileOpen} setOpen={setMobileOpen} />
      </Hidden>
    </>
  );
}

const useStyles = makeStyles({
  appBar: {
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    transition: "all 600ms",
    position: "fixed",
    zIndex: 1100,
  },

  transparent: {
    backgroundColor: "transparent !important",
  },
});
