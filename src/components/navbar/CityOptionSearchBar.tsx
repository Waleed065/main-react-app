import React, { useState } from "react";
import { Fab } from "@material-ui/core";
import { BiMapPin } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { getWhiteListCities } from "../../STORE/selectors";
import formattedTitle from "../../utils/formattedTitle";
import { setDestination } from "../../STORE/actions";
import { STORE } from "../../STORE";
import TransitionHeight from "../TransitionHeight";
import { useRef } from "react";
import { useCallback } from "react";
import { stateTypes } from "../../types";

interface schema {
  showCities: boolean;
  setShowCities: (arg: boolean) => void;
  setShowSearch: (arg: boolean) => void
}
export default function CityOptionSearchBar({
  showCities,
  setShowCities,
  setShowSearch
}: schema) {
  const city = useSelector((state: stateTypes) => state.destination.cityId);
  const whiteListCities = useSelector(getWhiteListCities)?.map((city) =>
    formattedTitle(city)
  );

  const [inputValue, setInputValue] = useState("");

  const searchOptionsRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const onCitySelect = useCallback(
    (city: string) => {
      const destination = STORE.getState().destination;

      dispatch(
        setDestination({
          ...destination,
          cityId: city.toLowerCase(),
        })
      );

      setShowCities(false);
      setShowSearch(true)
    },
    // eslint-disable-next-line
    [dispatch]
  );
  return (
    <div ref={searchOptionsRef} className={"search-bar no-select"}>
      <div
        className={`search-bar-options-container ${showCities ? 'options-active' : undefined}`}

        onClick={() => setShowCities(!showCities)}
      >
        <Fab color="primary" size={"small"}>
          <BiMapPin size={20} color="#fff" />
        </Fab>

        <div className={"search-bar-options"}>
          <strong>City</strong>
          <label>{formattedTitle(city)}</label>
        </div>
      </div>

      <TransitionHeight
        shouldShow={showCities}
        setShouldShow={setShowCities}
        inputPlaceholder={"Search..."}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSelect={onCitySelect}
        options={whiteListCities}

        searchOptionsRef={searchOptionsRef}
        optionsContainerStyle={{
          top: 70,
          minWidth: 280,
        }}
      />
    </div>
  );
}
