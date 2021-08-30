import React, { useState, useRef } from "react";
import "./css/ServicesTabs.css";

import { useDispatch, useSelector } from "react-redux";

import { stateTypes } from "../types";

import { FaHotel, FaCar } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
// import { IoExtensionPuzzleSharp } from "react-icons/io5";
import ServicesTopTabs from "./ServicesTopTabs";
import { tabs } from "../STORE/constants";
import { setServiceId } from "../STORE/actions";
import useEffectTabsBubble from "../utils/useEffectTabsBubble";

const allServices = [
  {
    tab: tabs[0],
    icon: <FaHotel />,
  },
  {
    tab: tabs[1],
    icon: <FaCar />,
  },
  {
    tab: tabs[2],
    icon: <MdSecurity />,
  },
];

export default function ServicesTabs() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: stateTypes) => state.serviceId);
  const [bubbleStyles, setBubbleStyles] = useState({
    width: 0,
    left: 0,
  });
  const allRefs = {
    [tabs[0]]: useRef<HTMLDivElement>(null),
    [tabs[1]]: useRef<HTMLDivElement>(null),
    [tabs[2]]: useRef<HTMLDivElement>(null),
  };

  useEffectTabsBubble({ activeTab, allRefs, setBubbleStyles });

  const onClick = (tabTitle: string) => {
    dispatch(setServiceId(tabTitle));
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
