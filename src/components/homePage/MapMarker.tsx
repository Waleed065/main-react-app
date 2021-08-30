import React, { memo, useState } from "react";
import { IoCarSport, IoLocationSharp } from "react-icons/io5";
import { FaHotel } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { Fade, Popper } from "@material-ui/core";
import OurServicesSingleItem from "../overView/OurServicesSingleItem";
import { itemType } from "../../types";

interface markerSchema {
  item: itemType;
  lat: number;
  lng: number;
}

const icons: any = {
  cars: <IoCarSport color={"var(--primaryThemeColor)"} size={20} />,
  hotels: <FaHotel color={"var(--primaryThemeColor)"} size={20} />,
  security: <MdSecurity color={"var(--primaryThemeColor)"} size={20} />,
};

const MapMarker = ({ item }: markerSchema) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const showPopper = Boolean(anchorEl);


  return (
    <div
      onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
      onMouseLeave={() => setAnchorEl(null)}
      style={{
        position: "relative",
      }}
    >
      <span>
        {icons[item.serviceId] ?? (
          <IoLocationSharp color={"var(--primaryThemeColor)"} size={20} />
        )}
      </span>
      <Popper open={showPopper} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <OurServicesSingleItem
              item={item}
              key={item._id}
              style={{
                maxWidth: "100%",
                width: 300,
              }}
            />
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default memo(MapMarker);
