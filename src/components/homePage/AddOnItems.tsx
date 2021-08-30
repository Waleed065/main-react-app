import React, { memo, useEffect, useState } from "react";
import "./css/Items.css";
import { useSelector } from "react-redux";
import {
  addOnType,
  currencyStateType,
  selectedAddOnType,
  stateTypes,
} from "../../types";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Count from "../Count";

interface schema {
  addOns: addOnType[];
  selectedAddOns: selectedAddOnType;
  setSelectedAddOns: (arg: any) => void;
}
export default function AddOnItems({
  addOns,
  selectedAddOns,
  setSelectedAddOns,
}: schema) {
  const currency = useSelector((state: stateTypes) => state.currency);

  return (
    <div id={"add-on-items-exclusive-container"}>
      {addOns.map((props, index) => {
        const isAdded = selectedAddOns.some(
          (addOn) => addOn.title === props.title
        );

        return (
          <AddOn
            key={index}
            props={props}
            currency={currency}
            isAdded={isAdded}
            setSelectedAddOns={setSelectedAddOns}
          />
        );
      })}
    </div>
  );
}

interface addOnSchema {
  props: addOnType;
  currency: currencyStateType;
  isAdded: boolean;
  setSelectedAddOns: (arg: any) => void;
}
const AddOn = memo(({ props, currency, isAdded, setSelectedAddOns }: addOnSchema) => {
  const { exchangeRate, currencyCode } = currency;
  const { title, price } = props;

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isAdded) {
      setSelectedAddOns((prevState: selectedAddOnType) =>
        prevState.map((addOn) =>
          addOn.title === title
            ? {
                ...addOn,
                quantity,
              }
            : addOn
        )
      );
    }
    // eslint-disable-next-line
  }, [quantity]);

  const addToCart = () => {
    if (isAdded) {

      setSelectedAddOns((prevState: selectedAddOnType) =>
        prevState.filter(
          (addOn) => addOn.title !== props.title
        )
      );
    } else
      setSelectedAddOns((prevState: selectedAddOnType[]) => [
        ...prevState,
        {
          title,
          price,
          quantity,
        },
      ]);
  };

  return (
    <div className={"add-ons-container category-items-content"} tabIndex={1}>
      <span className={"category-items-category-details"}>
        <h3>{title}</h3>

        <p className={"smallFont2 item-details"}>{"about"}</p>

        <label className={"add-ons-price-tag"}>
          {currencyCode}-{(price * exchangeRate).toFixed(1)}/Night
        </label>
      </span>
      <div className={"category-items-category-coin"}>
        <Count count={quantity} setCount={setQuantity} />

        <span
          className={`item-cart-button ${
            isAdded ? "remove-from-cart" : "add-to-cart"
          }`}
          onClick={addToCart}
        >
          <span>
            <AiOutlineShoppingCart />
          </span>
          <label>{isAdded ? "remove" : "Add"}</label>
        </span>
      </div>
    </div>
  );
})
