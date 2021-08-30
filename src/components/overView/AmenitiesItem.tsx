import React from "react";
import { IconBaseProps } from "react-icons";

interface PropsType {
  icon: IconBaseProps;
  title: string;
  details: string;
}

const AmenitiesItem: React.FC<PropsType> = ({ icon, title, details }) => {
  return (
    <span className={"amenities-item"}>
      <span>{icon}</span>
      <span className={"amenities-item-details"}>
        <h2 className={"heading"}>{title}</h2>
        <p className={"normalFont"}>{details}</p>
      </span>
    </span>
  );
};

export default AmenitiesItem;
