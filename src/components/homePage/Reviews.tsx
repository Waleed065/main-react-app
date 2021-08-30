import React, { useState, createRef } from "react";
import "./css/Reviews.css";
import { FcPrevious, FcNext } from "react-icons/fc";
// import { CSSTransition, TransitionGroup } from "react-transition-group";

import Heading from "./Heading";
import { useSelector } from "react-redux";
import { stateTypes } from "../../types";
import Ratings from "../Ratings";
// import Ratings from "../Ratings";

export default function Reviews() {
  const reviews = useSelector((state:stateTypes) => state.reviews);
  const [reviewIndex, setReviewIndex] = useState(0);
  const reviewsRef = createRef<HTMLSpanElement>();

  const { name = "", avatar = "", rated = 0, comment = "" } = reviews?.[reviewIndex] ?? {};

  return (
    <div id={"reviewsContainer"}>
      <Heading title={"Customer Reviews"} />
      <span className={"reviewSection"}>
        <img id={"avatar"} alt={name} src={avatar || "...loading"} />
        {/* <TransitionGroup>
          <CSSTransition
            nodeRef={reviewsRef}
            key={reviews[reviewIndex].id}
            in={true}
            timeout={500}
            classNames="reviewsTransition"
          > */}
        <span id={"credentials"} ref={reviewsRef}>
          <h3>{name}</h3>
          <span className={"user-rating"}>
            <Ratings averageRating={rated} />
          </span>
          <p>{comment}</p>
        </span>
        {/* </CSSTransition>
        </TransitionGroup> */}

        {reviewIndex > 0 && (
          <button
            id={"reviewLeftButton"}
            className={"imageButtons button"}
            onClick={() => setReviewIndex(reviewIndex - 1)}
          >
            <FcPrevious />
          </button>
        )}

        {reviewIndex < reviews.length - 1 && (
          <button
            id={"reviewRightButton"}
            className={"imageButtons button"}
            onClick={() => setReviewIndex(reviewIndex + 1)}
          >
            <FcNext />
          </button>
        )}
      </span>
    </div>
  );
}
