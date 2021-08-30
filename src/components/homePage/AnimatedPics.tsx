import React from "react";
import "./css/AnimatedPics.css";

import Notes from "./Notes";
import { useSelector } from "react-redux";
import { getRandomItem } from "../../STORE/selectors";

export default function Hotels() {
  const { pictures, title } = useSelector(getRandomItem);

  return (
    <div id={"scrollViewContainer"}>
      <div id="scrollView">
        {pictures.map((url, index) => (
          <img key={index} className={"animated-pic"} src={url} alt={title} />
        ))}
      </div>
      <Notes />
    </div>
  );
}
