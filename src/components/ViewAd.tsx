import React, { useState, useRef } from "react";
import "../screens/css/OurServicesItem.css";
import "./css/ViewAd.css";

import { modalAnimationTimeOut } from "../STORE/constants";

import Header from "./overView/Header";
import Tabs from "./overView/Tabs";
import About from "./overView/About";
import Calendars from "./homePage/Calendars";
import PopularAmenities from "./overView/PopularAmenities";
import MapSection from "./overView/MapSection";
import Amenities from "./overView/Amenities";
import ImgSlider from "./ImgSlider";
import Footer from "./Footer";
import CopyRights from "./CopyRights";
import { itemTabs } from "../STORE/constants";
import NavBar from "./navbar/NavBar";
import RatingContainer from "./overView/RatingContainer";
import { Backdrop, Fade, makeStyles, Modal } from "@material-ui/core";
import Clocks from "./homePage/Clocks";
import { itemType } from "../types";

interface schema {
  open: boolean;
  onClose: () => void;
  adInfo: itemType
}

const averageRating = 0;
const rating = {
  fiveStar: 0,
  fourStar: 0,
  threeStar: 0,
  twoStar: 0,
  oneStar: 0,
};

export default function ViewAd({ open, onClose, adInfo }: schema) {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [, setDateError] = useState({ state: false, helperText: "" });
  const overViewRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const RatingBarRef = useRef<HTMLDivElement>(null);

  const allRefs = [
    overViewRef,
    roomsRef,
    locationRef,
    amenitiesRef,
    RatingBarRef,
  ];

  const {
    about = "",
    amenities = [],
    pictures = [],
    price = 0,
    title = "",
    serviceId = "",
    countryId = "",
    cityId = "",
    location = [0, 0],
  } = adInfo ?? {};

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: modalAnimationTimeOut,
      }}
    >
      <Fade in={open} timeout={modalAnimationTimeOut}>
        <div id={"ourServices-item"}>
          <NavBar />
          <Header
            averageRating={averageRating}
            title={title}
            countryId={countryId}
            cityId={cityId}
            addToCart={() => null}
            isAdded={false}
          
          />
          <Tabs allRefs={allRefs} />

          <div className={"ourServices-paddingHorizontal"}>
            <Calendars
              setError={setDateError}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              startDate={startDate}
              endDate={endDate}
            />
            <Clocks
              setError={setDateError}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              startDate={startDate}
              endDate={endDate}
            />
          </div>

          <h2
            className={"heading ourServices-paddingHorizontal"}
            ref={overViewRef}
          >
            {itemTabs.tab1}
          </h2>
          <ImgSlider pictures={pictures} price={price} title={title} />

          <h2 className={"heading ourServices-paddingHorizontal"}>
            About this place
          </h2>
          <About about={about} averageRating={averageRating} />

          <h2 className={"heading ourServices-paddingHorizontal"}>
            Popular Amenities
          </h2>
          <PopularAmenities  amenities={amenities} />

          <h2
            className={"heading ourServices-paddingHorizontal"}
            ref={locationRef}
          >
            {itemTabs.tab2}
          </h2>
          <MapSection
            serviceId={serviceId}
            countryId={countryId}
            cityId={cityId}
            location={location}
          />

          <h2
            className={"heading ourServices-paddingHorizontal"}
            ref={amenitiesRef}
          >
            {itemTabs.tab3}
          </h2>
          <Amenities serviceId={serviceId}  amenities={amenities} />

          <h2
            className={"heading ourServices-paddingHorizontal"}
            ref={RatingBarRef}
          >
            {itemTabs.tab5}
          </h2>
          <RatingContainer rating={rating} />

          <Footer />
          <CopyRights />
        </div>
      </Fade>
    </Modal>
  );
}

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
