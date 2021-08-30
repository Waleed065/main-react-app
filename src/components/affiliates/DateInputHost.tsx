import React, { useState, useRef } from "react";
import "../css/ServicesTabs.css";
import {
  FaCalendarAlt,
  FaCalendarWeek,
  FaCalendar,
  FaCalendarDay,
} from "react-icons/fa";
import ServicesTopTabs from "../ServicesTopTabs";
import useEffectTabsBubble from "../../utils/useEffectTabsBubble";

const tabs = ["Past 7 Days", "Past 30 Days", "Previous Month", "Specific Dates"];

const allServices = [
  {
    tab: tabs[0],
    icon: <FaCalendarDay />,
  },
  {
    tab: tabs[1],
    icon: <FaCalendarWeek />,
  },
  {
    tab: tabs[2],
    icon: <FaCalendarAlt />,
  },
  {
    tab: tabs[3],
    icon: <FaCalendar />,
  },
];

export default function ServicesTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [bubbleStyles, setBubbleStyles] = useState({
    width: 0,
    left: 0,
  });
  const allRefs = {
    [tabs[0]]: useRef<HTMLDivElement>(null),
    [tabs[1]]: useRef<HTMLDivElement>(null),
    [tabs[2]]: useRef<HTMLDivElement>(null),
    [tabs[3]]: useRef<HTMLDivElement>(null),
  };

  useEffectTabsBubble({ activeTab, allRefs, setBubbleStyles });

  const onClick = (arg: string) => {
    setActiveTab(arg);
  };

  return (
    <div id={"services-top-tabs-container"}>
      {allServices.map(({ tab, icon }) => (
        <ServicesTopTabs
          key={tab}
          ref={allRefs[tab]}
          isActive={activeTab === tab}
          tabTitle={tab}
          icon={icon}
          onClick={onClick}
        />
      ))}

      <div id="bubble" style={bubbleStyles} />
    </div>
  );
}
