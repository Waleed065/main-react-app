import React, { memo, useRef } from "react";
import "./css/AddOnsForAd.css";
import { Checkbox } from "@material-ui/core";
import AddOnOptions from "./AddOnOptions";
import { CSSTransition } from "react-transition-group";

type argType = {
  value: string;
  title: string;
};
interface schema {
  title: string;
  checked: boolean;
  setChecked: (arg: { checked: boolean; title: string }) => void;
  onPriceChange: (arg: argType) => void;
  onAboutChange: (arg: argType) => void;
}
const AddOn = ({
  title,
  checked,
  setChecked,
  onPriceChange,
  onAboutChange,
}: schema) => {
  const optionsRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className={"ad-on-flex"}>
        <h4>{title}</h4>
        <Checkbox
          color={"primary"}
          checked={checked}
          // inputProps={{ "aria-label": "primary checkbox" }}
          onClick={() => setChecked({ checked, title })}
        />
      </div>
      <CSSTransition
        nodeRef={optionsRef}
        in={checked}
        timeout={300}
        classNames="post-ad-add-ons-transition"
        unmountOnExit
        appear
      >
        <div ref={optionsRef}>
          <AddOnOptions
            onPriceChange={(value) => onPriceChange({ value, title })}
            onAboutChange={(value) => onAboutChange({ value, title })}
          />
        </div>
      </CSSTransition>
    </div>
  );
};

export default memo(AddOn);
