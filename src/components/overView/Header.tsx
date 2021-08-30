import React from "react";
import "./css/Header.css";

import { FaLocationArrow } from "react-icons/fa";
import Ratings from "../Ratings";
import formattedTitle from "../../utils/formattedTitle";
import { AiOutlineShoppingCart } from "react-icons/ai";

interface schema {
  averageRating: number;
  title: string;

  countryId: string;
  cityId: string;
  addToCart: () => void;
  isAdded: boolean;
}
export default function Header({
  averageRating,
  title,
  countryId,
  cityId,
  addToCart,
  isAdded,
}: schema) {
  return (
    <div
      id={"over-view-header-container"}
      className={"ourServices-paddingHorizontal"}
    >
      <div id={"ourServices-header-container"}>
        <span id={"header-title-container"}>
          <h1 id={"over-view-header-container-heading"}>{title}</h1>
          <span className={"premium"}>PREMIUM</span>
        </span>
        <span className="over-view-header-container-star">
          <Ratings averageRating={averageRating} />

          <span className={"over-view-header-container-location-box"}>
            <span>
              <FaLocationArrow size={12} color="lightgreen" />
            </span>
            <span className={"over-view-header-container-location"}>
              {formattedTitle(cityId)}, {formattedTitle(countryId)}
            </span>
          </span>
        </span>
      </div>
      <span
        className={`item-cart-button ${
          isAdded ? "remove-from-cart" : "add-to-cart"
        }`}
        onClick={addToCart}
      >
        <span>
          <AiOutlineShoppingCart />
        </span>
        <label>{isAdded ? "Remove" : "Add To Cart"}</label>
      </span>
    </div>
  );
}
