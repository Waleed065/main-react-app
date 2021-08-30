import React, { useState, useRef, useEffect } from "react";
import "../css/Tabs.css";

import TabButton from "./TabButton";
import { itemTabs } from "../../STORE/constants";

interface schema {
  allRefs: React.RefObject<HTMLDivElement>[];
}

export default function Tabs({ allRefs }: schema) {
  const [activeTab, setActiveTab] = useState<string>(itemTabs.tab1);
  const [activeTabSizeSwitch, setActiveTabSizeSwitch] = useState(false);

  const [bubbleStyles, setBubbleStyles] = useState({
    width: 0,
    left: 0,
  });
  const overViewRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const listner = useRef(true);
  useEffect(() => {
    const condition = allRefs.every((refName) => refName?.current);

    if (!condition) return;

    let options = {
      threshold: 0,
    };

    const navCheck = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting && listner.current) {
          allRefs.forEach((element) => {
            if (entry.target.innerHTML === element.current?.innerHTML) {
              setActiveTab(entry.target.innerHTML);
            }
          });
        }
      });
    };

    const observer = new IntersectionObserver(navCheck, options);

    allRefs.forEach((refName) => {
      if (!refName?.current) return;
      observer.observe(refName.current);
    });
    return () => observer.disconnect();
  }, [allRefs]);

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
    const tabReferences = [
      overViewRef,
      roomsRef,
      locationRef,
      amenitiesRef,
      reviewsRef,
    ];
    const currentTab = tabReferences.find(
      (tab) => tab.current?.title === activeTab
    );
    if (currentTab?.current) {
      const { offsetLeft, clientWidth } = currentTab.current;
      const newBubbleStyles = {
        left: offsetLeft,
        width: clientWidth,
      };
      setBubbleStyles(newBubbleStyles);
      setActiveTabSizeSwitch(false);
    }
  }, [activeTab, activeTabSizeSwitch]);

  const timer = useRef<any>(null);
  const renderTabClick = (tabValue: string) => {
    if (tabValue === activeTab) return;
    setActiveTab(tabValue);
    allRefs.forEach((element) => {
      if (element.current?.innerHTML === tabValue) {
        clearTimeout(timer.current);
        listner.current = false;
        timer.current = setTimeout(() => (listner.current = true), 1000);
        element.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  };

  return (
    <div id={"tab-container"} className={"ourServices-paddingHorizontal"}>
      <TabButton
        ref={overViewRef}
        tabValue={itemTabs.tab1}
        isActive={activeTab === itemTabs.tab1}
        onClick={renderTabClick}
      />
      <TabButton
        ref={roomsRef}
        tabValue={itemTabs.tab2}
        isActive={activeTab === itemTabs.tab2}
        onClick={renderTabClick}
      />
      <TabButton
        ref={locationRef}
        tabValue={itemTabs.tab3}
        isActive={activeTab === itemTabs.tab3}
        onClick={renderTabClick}
      />
      <TabButton
        ref={amenitiesRef}
        tabValue={itemTabs.tab4}
        isActive={activeTab === itemTabs.tab4}
        onClick={renderTabClick}
      />
      <TabButton
        ref={reviewsRef}
        tabValue={itemTabs.tab5}
        isActive={activeTab === itemTabs.tab5}
        onClick={renderTabClick}
      />
      <div id={"tabs-bubble"} style={bubbleStyles} />
    </div>
  );
}
