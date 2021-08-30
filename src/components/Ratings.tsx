import React from "react";
import "./css/Ratings.css";

import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface schema {
  averageRating: number;
}

export default function Ratings({ averageRating }: schema) {
  const roundedValue = Math.round(averageRating);
  const stars = (index: number) => {
    if (index === 4 && averageRating >= 4.4 && averageRating <= 4.8)
      return <FaStarHalfAlt color={"var(--primaryThemeColor)"} />;
    if (index < roundedValue) {
      return <FaStar color={"var(--primaryThemeColor)"} />;
    } else return <FaRegStar color={"var(--primaryThemeColor)"} />;
  };

  return (
    <div className={"ratings-container"}>
      {Array(5)
        .fill(5)
        .map((item, index) => (
          <span key={index}>{stars(index)}</span>
        ))}
      <span className={"ratings-rated"}>{averageRating.toFixed(1)}</span>
    </div>
  );
}
