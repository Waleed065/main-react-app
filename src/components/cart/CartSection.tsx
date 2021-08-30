import React from "react";
import "./css/CartSection.css";
import { v4 as uuid } from "uuid";
import { getCategory } from "../../STORE/selectors";

import { useSelector, useDispatch } from "react-redux";
import { stateTypes } from "../../types";

import formattedTitle from "../../utils/formattedTitle";
import CartItem from "./CartItem";
import { removeFromCart } from "../../STORE/actions";

function eliminate_s(title: string) {
  return title.slice(-1) === "s"
    ? title.charAt(0).toUpperCase() + title.slice(1, -1)
    : title.charAt(0).toUpperCase() + title.slice(1);
}

export default function CartSection() {
  const cart = useSelector((state: stateTypes) => state.cart);
  const dispatch = useDispatch();

  // console.log(servicesCategoryItems);
  return (
    <div>
      {Object.keys(cart).map((cartTab) => (
        <div key={cartTab}>
          <h2 className={"cart-main-heading"}>
            {formattedTitle(cartTab)} Details
          </h2>

          {Object.keys(cart[cartTab]).map((cartCountry) => (
            <div key={cartCountry}>
              {Object.keys(cart[cartTab][cartCountry]).map((cartCity) => (
                <div key={cartCity}>
                  {Object.keys(cart[cartTab][cartCountry][cartCity]).map(
                    (cartCategory) => {
                      const {  avatar, title } = getCategory({
                        serviceId: cartTab,
                        countryId: cartCountry,
                        cityId: cartCity,
                        categoryId: cartCategory,
                      });

                      return (
                        <div key={cartCategory}>
                          <div>
                            <span className={"cart-details"}>
                              <h3 className={"cart-normal-heading"}>
                                Location
                              </h3>
                              <label className={"cart-details-date"}>
                                {formattedTitle(cartCity) +
                                  "/" +
                                  formattedTitle(cartCountry)}
                              </label>
                            </span>
                            <span className={"cart-details"}>
                              <h3 className={"cart-normal-heading"}>
                                {formattedTitle(cartTab)}
                              </h3>
                              <span className={"cart-details-box"}>
                                <img
                                  alt={"img"}
                                  className={"cart-heading-img"}
                                  src={avatar ?? undefined}
                                />
                                <label className={"cart-details-date"}>
                                  {eliminate_s(title)}
                                </label>
                              </span>
                            </span>
                          </div>
                          {/* <h2 className={"heading"}>{}</h2> */}
                          <div className={"cart-room-container"}>
                            {cart[cartTab][cartCountry][cartCity][
                              cartCategory
                            ].map((categoryItem) => (
                              <CartItem
                                key={uuid()}
                                categoryItem={categoryItem}
                                onCancel={() =>
                                  dispatch(removeFromCart(categoryItem))
                                }
                              />
                            ))}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
