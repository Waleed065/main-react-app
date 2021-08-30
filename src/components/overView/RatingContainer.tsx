import React from "react";

import "./css/Reviews.css";


import { abbreviateNumber } from "../../utils";
import RatingBarItSelf from "./RatingBarItSelf";
import Ratings from "../Ratings";

interface schema {
  rating: {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
  };
}
export default function RatingContainer({ rating }: schema) {
  const { fiveStar, fourStar, threeStar, twoStar, oneStar } = rating;
  const averageRating =
    (5 * fiveStar + 4 * fourStar + 3 * threeStar + 2 * twoStar + 1 * oneStar) /
    (fiveStar + fourStar + threeStar + twoStar + oneStar);
  const totalReviews = fiveStar + fourStar + threeStar + twoStar + oneStar;

  return (
    <div
      id={"review-bars-reviews-contianer"}
      className={"ourServices-paddingHorizontal"}
    >
      <span id={"review-bars-total-reviews"}>
        <span className={"normalFont"}>
          {`${abbreviateNumber(totalReviews)} Reviews`}
        </span>
        <Ratings averageRating={averageRating} />
      </span>
      <div id={"review-bars"}>
        <RatingBarItSelf
          barNumber={5}
          totalReviews={totalReviews}
          recievedReviews={fiveStar}
        />
        <RatingBarItSelf
          barNumber={4}
          totalReviews={totalReviews}
          recievedReviews={fourStar}
        />
        <RatingBarItSelf
          barNumber={3}
          totalReviews={totalReviews}
          recievedReviews={threeStar}
        />
        <RatingBarItSelf
          barNumber={2}
          totalReviews={totalReviews}
          recievedReviews={twoStar}
        />
        <RatingBarItSelf
          barNumber={1}
          totalReviews={totalReviews}
          recievedReviews={oneStar}
        />
      </div>
    </div>
  );
}
