import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./css/OptionsList.css";

interface optionsSchema {
  searchOptionsRef: React.RefObject<HTMLDivElement>;
  shouldShow: boolean;
  setShouldShow: (arg: boolean) => void;

  onSelect: (arg: string) => void;
  options: string[];
  optionsIcon?: JSX.Element;
}

export default function OptionsList({
  searchOptionsRef,
  shouldShow,
  setShouldShow,
  onSelect,
  options,
  optionsIcon,
}: optionsSchema) {
  useEffect(() => {
    const listner = (e: any) => {
      if (shouldShow && !searchOptionsRef.current?.contains(e.target)) {
        setShouldShow(false);
      }
    };
    window.addEventListener("mouseup", listner);
    return () => window.removeEventListener("mouseup", listner);
    // eslint-disable-next-line
  }, [shouldShow]);

  return (
    <>
      {options.length ? (
        options.map((state,  index) => (
          <span
            key={index}
            onClick={() => onSelect(state)}
            className={"searchoptions-input-option"}
          >
            {optionsIcon}

            <label>{state}</label>
          </span>
        ))
      ) : (
        <span id={"optionslist-empty-container"}>
          <AiOutlineSearch color={'var(--primaryThemeColor)'} size={30} />
        </span>
      )}
    </>
  );
}
