import React, { useState } from "react";
import "./css/Comment.css";
import moment from "moment";

import { BiLike, BiDislike } from "react-icons/bi";

import Ratings from "../Ratings";
import { stateTypes, commentsItemType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { abbreviateNumber } from "../../utils";
import { clearAlert, setAlert } from "../../STORE/actions";

interface schema {
  review: commentsItemType;
}

export default function Comment({ review }: schema) {
  const isLoggedIn = useSelector((state: stateTypes) => state.userInfo.isLoggedIn);
  const [liked, setLiked] = useState<boolean | null>(null);
  const dispatch = useDispatch();

  const { createdAt, avatar, upVotes, downVotes, name, rated, comment } =
    review;

  const renderOnLikePress = () => {
    if (isLoggedIn) {
      if (liked === true) {
        setLiked(null);
      } else {
        setLiked(true);
      }
    } else {
      dispatch(
        setAlert({
          head: "Login Required",
          message: "You must be logged in to cast a like!",
          leftButtonText: "Cancel",
          rightButtonText: "Ok",
          onLeftButtonPress: () => dispatch(clearAlert()),
          onRightButtonPress: () => dispatch(clearAlert()),
        })
      );
    }
  };

  const renderOnDisLikePress = () => {
    if (isLoggedIn) {
      if (liked === false) {
        setLiked(null);
      } else {
        setLiked(false);
      }
    } else {
      dispatch(
        setAlert({
          head: "Login Required",
          message: "You must be logged in to cast a like!",
          leftButtonText: "Cancel",
          rightButtonText: "Ok",
          onLeftButtonPress: () => dispatch(clearAlert()),
          onRightButtonPress: () => dispatch(clearAlert()),
        })
      );
    }
  };

  return (
    <div className={"review-comment"}>
      <img alt={name} src={avatar} />
      <div id={"comment-container"}>
        <span className={"review-comment-title"}>
          <label>{name}</label>
          <Ratings averageRating={rated} />
        </span>
        <p className={"normalFont"}>{comment}</p>
        <span className={"review-comment-published"}>
          Published {moment(createdAt, "YYYYMMDD").fromNow()}
        </span>
        <div>
          <span className={"review-comment-like-section"}>
            <span onClick={renderOnLikePress}>
              <BiLike
                color={liked === true ? "var(--primaryThemeColor)" : "#000"}
              />
            </span>
            <label className={"smallFont"}>{abbreviateNumber(upVotes)}</label>

            <span onClick={renderOnDisLikePress}>
              <BiDislike
                color={liked === false ? "var(--primaryThemeColor)" : "#000"}
              />
            </span>
            <label className={"smallFont"}>{abbreviateNumber(downVotes)}</label>
          </span>
        </div>
      </div>
    </div>
  );
}
