import React, { useState } from "react";

import "./css/About.css";

import { IoIosStar } from "react-icons/io";

interface schema {
  about: string;
  averageRating: number;
}

export default function About({ about, averageRating }: schema) {
  const [readMore, setReadMore] = useState(false);

  return (
    <div id={"about-container"} className={"ourServices-paddingHorizontal"}>
      <div id={"about-details"}>
        <p
          className={`about-para ${
            readMore ? "about-readMore" : "about-readLess"
          }`}
        >
          {about}
        </p>
        <span
          className={"about-readMore-text"}
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? "Read Less" : "Read More"}
        </span>
      </div>

      <div id={"about-rating-container"}>
        <span>
          <IoIosStar color={"var(--primaryThemeColor)"} size={'30'} />
        </span>
        <div>
          <h2 id={"about-headings"}>
            {averageRating.toFixed(1)}/5 {remarks(averageRating)}
          </h2>
          <label>
            Customers rated this {averageRating.toFixed(1)} out of 5
          </label>
        </div>
      </div>
    </div>
  );
}

const remarks = (rating: number) => {
  if (rating < 1) {
    return "Very Bad";
  } else if (rating >= 1 && rating < 2) {
    return "Satisfactory";
  } else if (rating >= 2 && rating < 2.5) {
    return "Fair";
  } else if (rating >= 2.5 && rating < 3) {
    return "Good";
  } else if (rating >= 3 && rating < 3.5) {
    return "Good Enough";
  } else if (rating >= 3.5 && rating < 4) {
    return "Better";
  } else if (rating >= 4 && rating < 4.3) {
    return "Very Good";
  } else if (rating >= 4.3 && rating < 4.6) {
    return "Best";
  } else if (rating >= 4.6) {
    return "Excellent";
  }
};
