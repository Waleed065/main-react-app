import React from "react";
import "./css/AccountOptions.css";
import { Link } from "react-router-dom";
import { FaAdversal, FaIdCardAlt } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";

import { GoListOrdered } from "react-icons/go";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";

import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import { getIsAffiliate } from "../../STORE/selectors";
import { staticPaths } from "../../STORE/constants";

const {
  postAdPath,
  myAdsPath,
  myOrdersPath,
  chatPath,
  favoritesPath,
  affiliatesDashboardPath,
} = staticPaths;

export default function AccountOptions() {
  const isAffiliate = useSelector(getIsAffiliate);

  return (
    <IconContext.Provider
      value={{ size: "20px", color: "var(--primaryThemeColor)" }}
    >
      <div id={"accountOptions-container"}>
        <Link to={postAdPath} className={"accountOption-itself"}>
          <div>
            <HiSpeakerphone />
          </div>
          <label>Post Ad</label>
        </Link>
        <Link to={myAdsPath} className={"accountOption-itself"}>
          <div>
            <FaAdversal />
          </div>
          <label>My Ads</label>
        </Link>
        <Link to={myOrdersPath} className={"accountOption-itself"}>
          <div>
            <GoListOrdered />
          </div>
          <label>My Orders</label>
        </Link>
        <Link to={chatPath} className={"accountOption-itself"}>
          <div>
            <BsFillChatDotsFill />
          </div>
          <label>My Chats</label>
        </Link>
        <Link to={favoritesPath} className={"accountOption-itself"}>
          <div>
            <AiFillHeart />
          </div>
          <label>Favourites</label>
        </Link>
        {isAffiliate && (
          <Link to={affiliatesDashboardPath} className={"accountOption-itself"}>
            <div>
              <FaIdCardAlt />
            </div>
            <label>Affiliate Dashboard</label>
          </Link>
        )}
      </div>
    </IconContext.Provider>
  );
}
