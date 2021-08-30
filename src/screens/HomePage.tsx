import React, { forwardRef, useEffect } from "react";
import "./css/HomePage.css";
import Cover from "../components/homePage/Cover";
import Entertain from "../components/homePage/Entertain";
import Ad from "../components/homePage/Ad";
import BecomeAffiliate from "../components/homePage/BecomeAffiliate";
import Heading from "../components/homePage/Heading";
import AnimatedPics from "../components/homePage/AnimatedPics";
import Reviews from "../components/homePage/Reviews";

import ImgSlider from "../components/ImgSlider";
import { useDispatch, useSelector } from "react-redux";
import { getRandomItem, getServicesHeadings } from "../STORE/selectors";
import FooterContainer from "../components/FooterContainer";
import { fetchHeadings, fetchReviews } from "../STORE/actions";
// import { stateTypes } from "../types";

type PropsType = {};
type RefType = HTMLDivElement | null;
const HomePage = forwardRef<RefType, PropsType>((props, ref) => {
  const randomItem = useSelector(getRandomItem);

  const { headings } = useSelector(getServicesHeadings);

  const dispatch = useDispatch();

  const condition = headings.calendarHeadingOne.length > 0;

  useEffect(() => {
    if (condition) return;
    dispatch(fetchHeadings());
  }, [dispatch, condition]);


  useEffect(() => {
    dispatch(fetchReviews());
  },[dispatch])

  
  const { pictures, price, title } = randomItem;

  return (
    <>
      <div id={"homePage-container"} className={"fade-in"}>
        <div id={"imgAndServicesContainer"}>
          <Cover ref={ref} />
          <Entertain />
        </div>
        <Heading title={"Top Rated Hotels"} />
        <ImgSlider pictures={pictures} price={price} title={title} />
        <Ad />

        <Heading title={"Become An Affiliate"} />
        <BecomeAffiliate />
        <AnimatedPics />
        <Reviews />
      </div>
      <FooterContainer />
    </>
  );
});

export default HomePage;
