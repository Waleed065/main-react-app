import React, { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../css/Tabs.css";
import TabButton from "../overView/TabButton";
import { staticPaths } from "../../STORE/constants";

const {
  affiliatesDashboardPath,
  affiliatesGroupPath,
  affiliatesPerformancePath,
  affiliatesExtrasPath,
  affiliatesProductsPath,
} = staticPaths;

export default function Tabs() {
  const [activeTabSizeSwitch, setActiveTabSizeSwitch] = useState(false);

  const [bubbleStyles, setBubbleStyles] = useState({
    width: 0,
    left: 0,
  });
  const dashboardRef = useRef<HTMLDivElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const performanceRef = useRef<HTMLDivElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);

  const history = useHistory();
  const pathname = useLocation().pathname;

  useEffect(() => {
    let shouldUpdate = true;
    function resizeTab() {
      if (!shouldUpdate) return;
      shouldUpdate = false;
      setTimeout(() => {
        shouldUpdate = true;
        setActiveTabSizeSwitch(true);
      }, 100);
    }
    window.addEventListener("resize", resizeTab);
    return () => window.removeEventListener("resize", resizeTab);
  }, []);

  useEffect(() => {
    let currentTab = undefined;

    switch (pathname) {
      case affiliatesDashboardPath:
        currentTab = dashboardRef;
        break;
      case affiliatesGroupPath:
        currentTab = groupsRef;
        break;
      case affiliatesPerformancePath:
        currentTab = performanceRef;
        break;
      case affiliatesExtrasPath:
        currentTab = extrasRef;
        break;
      case affiliatesProductsPath:
        currentTab = productsRef;
        break;
    }

    if (currentTab?.current) {
      const { offsetLeft, clientWidth } = currentTab.current;
      const newBubbleStyles = {
        left: offsetLeft,
        width: clientWidth,
      };
      setBubbleStyles(newBubbleStyles);
      setActiveTabSizeSwitch(false);
    }
  }, [pathname, activeTabSizeSwitch]);

  const renderTabClick = (tabValue: string) => {
    switch (tabValue) {
      case "Dashboard":
        history.push(affiliatesDashboardPath);
        break;
      case "Groups":
        history.push(affiliatesGroupPath);
        break;
      case "Products":
        history.push(affiliatesProductsPath);
        break;
      case "Performance":
        history.push(affiliatesPerformancePath);
        break;
      case "Extras":
        history.push(affiliatesExtrasPath);
        break;
    }
  };

  return (
    <div id={"tab-container"} className={"ourServices-paddingHorizontal"}>
      <TabButton
        ref={dashboardRef}
        tabValue={"Dashboard"}
        isActive={pathname === affiliatesDashboardPath}
        onClick={renderTabClick}
      />
      <TabButton
        ref={groupsRef}
        tabValue={"Groups"}
        isActive={pathname === affiliatesGroupPath}
        onClick={renderTabClick}
      />
      <TabButton
        ref={productsRef}
        tabValue={"Products"}
        isActive={pathname === affiliatesProductsPath}
        onClick={renderTabClick}
      />
      <TabButton
        ref={performanceRef}
        tabValue={"Performance"}
        isActive={pathname === affiliatesPerformancePath}
        onClick={renderTabClick}
      />
      <TabButton
        ref={extrasRef}
        tabValue={"Extras"}
        isActive={pathname === affiliatesExtrasPath}
        onClick={renderTabClick}
      />
      <div id={"tabs-bubble"} style={bubbleStyles} />
    </div>
  );
}
