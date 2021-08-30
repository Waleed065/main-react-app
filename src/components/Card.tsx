import React, { memo } from "react";
import { useSelector } from "react-redux";
import { stateTypes } from "../types";
import "./css/Card.css";

interface PropsType {
  picture: string;
  price: number;
  title: string;
  index: number;
  isActive: boolean;
  setActiveIndex: (num: number) => void;
}

const Card: React.FC<PropsType> = ({
  picture,
  price,
  title,
  index,
  isActive,
  setActiveIndex,
}) => {
  const { currencyCode, exchangeRate } = useSelector(
    (state: stateTypes) => state.currency
  );

  return (
    <div
      onClick={() => setActiveIndex(index)}
      className={`card ${isActive ? "inActiveCard" : "activeCard"}`}
    >
      <img src={picture} alt={title} className={"card-pic"} />

      <div className={"cardCoverContainer"}>
        <h2>{title}</h2>
        <p>
          Starting From {(price * exchangeRate).toFixed(1)} {currencyCode}
        </p>
      </div>
    </div>
  );
};

export default memo(Card);
