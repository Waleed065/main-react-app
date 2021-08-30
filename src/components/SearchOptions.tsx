import React, { useEffect, useRef, useState } from "react";
import "./css/SearchOptions.css";

import TransitionHeight from "./TransitionHeight";

interface schema {
  shouldShow: boolean;
  setShouldShow: (arg: boolean) => void;
  options: string[];
  leftIcon?: JSX.Element;
  title: string;
  inputPlaceholder: string;
  onSelect: (arg: string) => void;
  optionsIcon?: JSX.Element;
  barStyle?: any;
  optionsContainerStyle?: any;
  button?: boolean;
}
export default function Searchoptions({
  options,
  optionsIcon,
  shouldShow,
  setShouldShow,
  leftIcon,
  title,
  inputPlaceholder,
  onSelect,
  barStyle,
  button,
  optionsContainerStyle,
}: schema) {
  const searchOptionsRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("");
  }, [shouldShow]);

  return (
    <div ref={searchOptionsRef} className={"searchoptions-container no-select"}>
      <div
        className={`searchoptions-input ${button && "button"}`}
        onClick={() => {
          setShouldShow(!shouldShow);
        }}
        style={barStyle}
      >
        <span>{leftIcon}</span>

        <label>{title}</label>
      </div>

      <TransitionHeight
        shouldShow={shouldShow}
        setShouldShow={setShouldShow}
        inputPlaceholder={inputPlaceholder}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSelect={onSelect}
        options={options}
        optionsIcon={optionsIcon}
        searchOptionsRef={searchOptionsRef}
        optionsContainerStyle={optionsContainerStyle}
      />
    </div>
  );
}
