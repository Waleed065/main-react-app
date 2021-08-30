import React, { useRef, useState } from "react";
import { Fab } from "@material-ui/core";
import { GiSelect } from "react-icons/gi";
import TransitionHeight from "../TransitionHeight";
import { useDispatch, useSelector } from "react-redux";
import formattedTitle from "../../utils/formattedTitle";
import { setServiceId } from "../../STORE/actions";
import { tabs } from "../../STORE/constants";
import { stateTypes } from "../../types";

const options = tabs.map((tab) => formattedTitle(tab));

interface schema {
  showServices: boolean;
  setShowServices: (arg: boolean) => void;
  setShowCountries: (arg: boolean) => void
}
export default function ServiceOptionSearchBar({
  showServices,
  setShowServices,
  setShowCountries
}: schema) {
  const serviceId = useSelector((state: stateTypes) => state.serviceId);
  const [inputValue, setInputValue] = useState("");
  const searchOptionsRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const onSelect = (tabTitle: string) => {
    dispatch(setServiceId(tabTitle.toLowerCase()));
    setShowServices(false);
    setShowCountries(true)
  };

  return (
    <div ref={searchOptionsRef} className={"search-bar no-select"}>
      <div
        className={`search-bar-options-container ${showServices ? 'options-active' : undefined}`}
        onClick={() => setShowServices(!showServices)}
      >
        <Fab color="primary" size={"small"}>
          <GiSelect size={20} color="#fff" />
        </Fab>

        <div className={"search-bar-options"}>
          <strong>Service</strong>
          <label>{formattedTitle(serviceId)}</label>
        </div>
      </div>
      <TransitionHeight
        shouldShow={showServices}
        setShouldShow={setShowServices}
        inputPlaceholder={"Search..."}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSelect={onSelect}
        options={options}

        searchOptionsRef={searchOptionsRef}
        optionsContainerStyle={{
          top: 70,
          left: 0,
          minWidth: 280,
        }}
      />
    </div>
  );
}
