import React, { useRef, useState } from "react";
import "../css/TransitionHeight.css";

import { Fab } from "@material-ui/core";
import { BsSearch } from "react-icons/bs";
import { CSSTransition } from "react-transition-group";
import OptionsList from "../OptionsList";
import { AiOutlineClockCircle } from "react-icons/ai";
import NavBarSearch from "../NavBarSearch";
import { useSelector } from "react-redux";
import { stateTypes } from "../../types";
import { useHistory } from "react-router-dom";

interface schema {
  showSearch: boolean;
  setShowSearch: (arg: boolean) => void;
  setSecondaryNav: (arg: boolean) => void
}
export default function SearchOptionSearchBar({
  showSearch,
  setShowSearch,
  setSecondaryNav
}: schema) {
  const serviceId = useSelector((state: stateTypes) => state.serviceId);
  const { countryId, cityId } = useSelector(
    (state: stateTypes) => state.destination
  );
  const history = useHistory();

  const [options, setOptions] = useState<string[]>([]);
  const optionsRef = useRef(null);
  const searchOptionsRef = useRef(null);

  const onSelect = (query: string) => {
    history.push(`/items/q=${query}?service=${serviceId}&country=${countryId}&city=${cityId}`);
    setSecondaryNav(false);
  };

  return (
    <div ref={searchOptionsRef} className={"search-bar no-select"}>
      <div
        className={`search-bar-options-container ${
          showSearch ? "options-active" : undefined
        }`}
        onClick={() => setShowSearch(!showSearch)}
      >
        <Fab color="primary" size={"small"}>
          <BsSearch size={20} color="#fff" />
        </Fab>
        <div className={"search-bar-options"}>
          <strong>Search</strong>
          <label>Tell Us More...</label>
        </div>
      </div>

      <CSSTransition
        in={showSearch}
        classNames={"css-transition-height"}
        nodeRef={optionsRef}
        timeout={300}
        unmountOnExit
      >
        <div
          ref={optionsRef}
          className={"searchoptions-input-options-list no-select"}
          style={{
            top: 70,
            right: 0,
            minWidth: 280,
          }}
        >
          <NavBarSearch setOptions={setOptions} onSelect={onSelect} />
          <OptionsList
            searchOptionsRef={searchOptionsRef}
            shouldShow={showSearch}
            setShouldShow={setShowSearch}
            onSelect={onSelect}
            options={options}
            optionsIcon={<AiOutlineClockCircle />}
          />
        </div>
      </CSSTransition>
    </div>
  );
}
