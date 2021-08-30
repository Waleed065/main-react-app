import React, { useState, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { FaGlobeAsia } from "react-icons/fa";

import { stateTypes } from "../types";
import { setDestination } from "../STORE/actions";
import { getWhiteListCountries } from "../STORE/selectors";
import { GoGlobe } from "react-icons/go";

import SearchOptions from "./SearchOptions";
import formattedTitle from "../utils/formattedTitle";



function SearchCountry() {
  const destination = useSelector((state: stateTypes) => state.destination);
  const whiteListCountries = useSelector(getWhiteListCountries);
  const whiteListCountriesList = Object.keys(whiteListCountries).map(
    (country) => formattedTitle(country)
  );

  const dispatch = useDispatch();

  const [showCountries, setShowCountries] = useState(false);

  const onCountrySelect = useCallback(
    (state: string) => {

        const city =
          whiteListCountries[state.toLowerCase()]?.[0]?.toLowerCase();

        dispatch(
          setDestination({
            countryId: state.toLowerCase(),
            cityId: city,
          })
        );


      setShowCountries(false);
    },
    [whiteListCountries, dispatch]
  );

  return (
    <SearchOptions
      shouldShow={showCountries}
      setShouldShow={setShowCountries}
      leftIcon={<GoGlobe color={"var(--primaryThemeColor)"} />}
      onSelect={onCountrySelect}
      options={whiteListCountriesList}
      optionsIcon={<FaGlobeAsia color={"var(--primaryThemeColor)"} />}
      title={formattedTitle(destination.countryId)}
      inputPlaceholder={"Search"}
    />
  );
}

export default SearchCountry;
