import React, {  useRef } from "react";
import "./css/TransitionHeight.css";
import { CSSTransition } from "react-transition-group";
import OptionsList from "./OptionsList";

interface schema {
  shouldShow: boolean;
  optionsContainerStyle?: any;
  inputPlaceholder: string;
  inputValue: string;
  setInputValue: (arg: string) => void;
  searchOptionsRef: React.RefObject<HTMLDivElement>;
  setShouldShow: (arg: boolean) => void;
  onSelect: (arg: string) => void;
  options: string[];
  optionsIcon?: JSX.Element;
}
export default function TransitionHeight({
  shouldShow,
  optionsContainerStyle,
  inputPlaceholder,
  inputValue,
  setInputValue,
  searchOptionsRef,
  setShouldShow,
  onSelect,
  options,
  optionsIcon,
}: schema) {
  const optionsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <CSSTransition
        in={shouldShow}
        classNames={"css-transition-height"}
        nodeRef={optionsRef}
        timeout={300}
        unmountOnExit
      >
        <div
          ref={optionsRef}
          className={"searchoptions-input-options-list no-select"}
          style={optionsContainerStyle}
        >
          <input
            className={"white-list-input"}
            type={"text"}
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <OptionsList
            searchOptionsRef={searchOptionsRef}
            shouldShow={shouldShow}
            setShouldShow={setShouldShow}
            onSelect={onSelect}
            options={options.filter((state) =>
              state.toLowerCase().includes(inputValue.toLowerCase())
            )}
            optionsIcon={optionsIcon}
          />
        </div>
      </CSSTransition>
    </>
  );
}
