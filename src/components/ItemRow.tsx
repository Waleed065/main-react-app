import React from "react";
import "./css/ItemRow.css";

import formattedTitle from "../utils/formattedTitle";

interface schema {
  adInfo: {
    avatar: string;
    title: string;
    price: number;

    countryId: string;
    cityId: string;

    serviceId: string;
  };
  status: string;
  onClick: () => void;
}

export default function ItemRow({ adInfo, status, onClick }: schema) {
  const { avatar, title, price, countryId, cityId, serviceId } = adInfo;

  return (
    <div className={"itemRow-container button"} onClick={onClick}>
      <img src={avatar} alt={"img"} />
      <div className={"itemRow-details-container"}>
        <div className={"itemRow-details-column"}>
          <div className={"itemRow-details"}>
            <label>Title</label>
            <span>
              <label>{formattedTitle(title)}</label>
            </span>
          </div>
          <div className={"itemRow-details"}>
            <label>Price:</label>
            <span>
              <label>{price} $USD</label>
            </span>
          </div>
          <div className={"itemRow-details"}>
            <label>Service</label>
            <span>
              <label>{formattedTitle(serviceId)}</label>
            </span>
          </div>
        </div>

        <div className={"itemRow-details-column"}>
          <div className={"itemRow-details"}>
            <label>Country</label>
            <span>
              <label>{formattedTitle(countryId)}</label>
            </span>
          </div>
          <div className={"itemRow-details"}>
            <label>City</label>
            <span>
              <label>{formattedTitle(cityId)}</label>
            </span>
          </div>
          <div className={"itemRow-details"}>
            <label>Status</label>
            <span>
              <label>{status}</label>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
