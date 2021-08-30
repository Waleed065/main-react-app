import React, { useCallback, useRef, useState } from "react";
import { Fab } from "@material-ui/core";
import { FaGlobeAmericas } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {

  getWhiteListCountries,
} from "../../STORE/selectors";
import formattedTitle from "../../utils/formattedTitle";
import { setDestination } from "../../STORE/actions";
import TransitionHeight from "../TransitionHeight";
import { stateTypes } from "../../types";

interface schema {
  showCountries: boolean;
  setShowCountries: (arg: boolean) => void;
  setShowCities: (arg: boolean) => void;
}
export default function CountryOptionLocation({
  showCountries,
  setShowCountries,
  setShowCities
}: schema) {

  const country = useSelector((state: stateTypes) => state.destination.countryId);
  const [inputValue, setInputValue] = useState("");
  const whiteListCountries = useSelector(getWhiteListCountries);

  const searchOptionsRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const whiteListCountriesList = Object.keys(whiteListCountries).map(
    (country) => formattedTitle(country)
  );

  const onCountrySelect = useCallback(
    (state: string) => {
      const city = whiteListCountries[state.toLowerCase()]?.[0]?.toLowerCase();

      dispatch(
        setDestination({
          countryId: state.toLowerCase(),
          cityId: city,
        })
      );

      setShowCountries(false);
      setShowCities(true)
    },

    // eslint-disable-next-line
    [whiteListCountries, dispatch]
  );

  return (
    <div ref={searchOptionsRef} className={"search-bar no-select"}>
      <div
        className={`search-bar-options-container ${showCountries ? 'options-active' : undefined}`}

        onClick={() => setShowCountries(!showCountries)}
      >
        <Fab color="primary" size={"small"}>
          <FaGlobeAmericas size={20} color="#fff" />
        </Fab>

        <div className={"search-bar-options"}>
          <strong>Country</strong>
          <label>{formattedTitle(country)}</label>
        </div>
      </div>

      <TransitionHeight
        shouldShow={showCountries}
        setShouldShow={setShowCountries}
        inputPlaceholder={"Search..."}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSelect={onCountrySelect}
        options={whiteListCountriesList}
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
