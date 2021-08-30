import React, { useState, useEffect, useRef } from "react";
import "./css/OurServicesItem.css";

import Header from "../components/overView/Header";
import Tabs from "../components/overView/Tabs";
import About from "../components/overView/About";
import Calendars from "../components/homePage/Calendars";
import PopularAmenities from "../components/overView/PopularAmenities";
import Similar from "../components/overView/Similar";
import MapSection from "../components/overView/MapSection";
import Amenities from "../components/overView/Amenities";
import RatingContainer from "../components/overView/RatingContainer";
import AllComments from "../components/overView/AllComments";
import ImgSlider from "../components/ImgSlider";

import { itemTabs } from "../STORE/constants";
import {
  addToCart,
  fetchOurServicesItem,
  removeFromCart,
  setSnackBar,
  updateCart,
} from "../STORE/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { addToCart, removeFromCart, updateCart } from "../../STORE/actions";
import { selectedAddOnType, stateTypes } from "../types";
import { getItem } from "../STORE/selectors";
import ActivityIndicator from "../components/ActivityIndicator";
import Clocks from "../components/homePage/Clocks";
import AddOnsModal from "../components/modal/AddOnsModal";
import FooterContainer from "../components/FooterContainer";

export default function OurServicesCurrentItem() {
  const { itemParam } = useParams<any>();
  const currentItem = useSelector((state: stateTypes) =>
    getItem(state, itemParam)
  );

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const servicesLoading = useSelector(
    (state: stateTypes) => state.servicesLoading
  );
  // const dispatch = useDispatch();
  const overViewRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<selectedAddOnType>([]);
  const [dateError, setDateError] = useState({
    state: false,
    helperText: "",
  });

  const allRefs = [
    overViewRef,
    roomsRef,
    locationRef,
    amenitiesRef,
    reviewsRef,
  ];

  const {
    countryId,
    cityId,
    categoryId,
    about,
    amenities,
    pictures,
    premium,
    price,
    rating,
    title,
    location,
    addOns,
    _id,
    serviceId,
  } = currentItem;

  const isAdded =
    useSelector((state: stateTypes) => state.cart)?.[serviceId]?.[countryId]?.[
      cityId
    ]?.[categoryId]?.some((cartItem: any) => cartItem._id === _id) ?? false;
  const avatar = pictures[0];

  useEffect(() => {
    if (_id !== "") {
      return;
    }
    let mounted = true;
    if (!mounted) return;
    console.log("fetching _id");

    dispatch(
      fetchOurServicesItem({
        itemParam,
      })
    );
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (dateError.state) {
      dispatch(setSnackBar(dateError.helperText));
      if (isAdded) {
        dispatch(removeFromCart(cartBaby()));
      }
    }
    // eslint-disable-next-line
  }, [dateError.state]);

  useEffect(() => {
    if (isAdded && !dateError.state) {
      dispatch(updateCart(cartBaby()));
    }
    // eslint-disable-next-line
  }, [startDate, endDate, selectedAddOns]);

  const cartBaby = () => {
    return {
      avatar,
      about,
      premium,
      price,
      title,
      addOns: selectedAddOns,
      countryId,
      cityId,

      startDate,
      endDate,
      _id,
      serviceId,
      categoryId,
    };
  };

  const renderAddToCartButton = () => {
    if (dateError.state) {
      return dispatch(setSnackBar(dateError.helperText));
    }

    if (isAdded) {
      dispatch(removeFromCart(cartBaby()));
    } else {
      dispatch(addToCart(cartBaby()));
    }
  };

  const { fiveStar, fourStar, threeStar, twoStar, oneStar } = rating;
  const averageRating =
    (5 * fiveStar + 4 * fourStar + 3 * threeStar + 2 * twoStar + 1 * oneStar) /
      (fiveStar + fourStar + threeStar + twoStar + oneStar) || 0;

  return (
    <>
      <ActivityIndicator loading={servicesLoading} />
      <div id={"ourServices-item"} className={'fade-in'}>
        <Header
          averageRating={averageRating}
          title={title}
          countryId={countryId}
          cityId={cityId}
          addToCart={renderAddToCartButton}
          isAdded={isAdded}
        />
        <Tabs allRefs={allRefs} />
        {/*  */}

        <div
          className={
            "ourServices-paddingHorizontal our-services-extras-container"
          }
        >
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
          {addOns.length && (
            <AddOnsModal
              addOns={addOns}
              selectedAddOns={selectedAddOns}
              setSelectedAddOns={setSelectedAddOns}
            />
          )}
        </div>

        <h2
          className={"heading ourServices-paddingHorizontal"}
          ref={overViewRef}
        >
          {itemTabs.tab1}
        </h2>
        <ImgSlider pictures={pictures} price={price} title={title} />
        {/*  */}
        <h2 className={"heading ourServices-paddingHorizontal"}>
          About this place
        </h2>
        <About about={about} averageRating={averageRating} />
        {/*  */}
        <h2 className={"heading ourServices-paddingHorizontal"}>
          Popular Amenities
        </h2>
        <PopularAmenities  amenities={amenities} />
        {/*  */}
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
        {/*  */}
        <h2
          className={"heading ourServices-paddingHorizontal"}
          ref={amenitiesRef}
        >
          {itemTabs.tab3}
        </h2>
        <Amenities serviceId={serviceId} amenities={amenities} />

        {/*  */}
        <h2 className={"heading ourServices-paddingHorizontal"} ref={roomsRef}>
          {itemTabs.tab4}
        </h2>
        <Similar _id={_id} />
        {/*  */}
        <h2
          className={"heading ourServices-paddingHorizontal"}
          ref={reviewsRef}
        >
          {itemTabs.tab5}
        </h2>
        <RatingContainer rating={rating} />
        <AllComments />
      </div>

      <FooterContainer />
    </>
  );
}
