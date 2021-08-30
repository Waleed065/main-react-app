import React, { useEffect } from "react";
import "./css/TabOptions.css";

import { FaHotel, FaCar } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { IconBaseProps } from "react-icons";

import formattedTitle from '../utils/formattedTitle';

interface schema {
  searchOptionsContainerRef: React.RefObject<HTMLDivElement>;
  setShowTabs: (arg: boolean) => void;
  tabs: string[];
  onSelect: (tab: string) => void;
  icon?: IconBaseProps;
}

function TabOptions({ searchOptionsContainerRef, setShowTabs, tabs, onSelect, icon }: schema) {
  useEffect(() => {
    const listner = (e: any) => {
      if (!searchOptionsContainerRef.current?.contains(e.target)) {
        setShowTabs(false);
      }
    };
    window.addEventListener("mouseup", listner);
    return () => window.removeEventListener("mouseup", listner);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {tabs.map((tab) => (
        <TabOption key={tab} icon={icon} tab={tab} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default TabOptions;

const tabOptionIcon: any = {
  hotels: <FaHotel />,
  cars: <FaCar />,
  security: <MdSecurity />,
};

interface tabOptionSchema {
  tab: string;
  onSelect: (tab:string) => void;
  icon?: IconBaseProps;
}
function TabOption({ tab, onSelect, icon }: tabOptionSchema) {
  return (
    <div className={"tabOption"} onClick={() => onSelect(tab)}>
      <span>{icon ? icon : tabOptionIcon[tab]}</span>
      <label>{formattedTitle(tab)}</label>
    </div>
  );
}
