import React, { useState, useCallback } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiRoadMapFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { stateTypes } from "../types";
import { setDestination } from "../STORE/actions";
import { getWhiteListCities } from "../STORE/selectors";
import SearchOptions from "./SearchOptions";
import formattedTitle from "../utils/formattedTitle";

function SearchCity() {
  const destination = useSelector((state: stateTypes) => state.destination);
  const whiteListCities = useSelector(getWhiteListCities)?.map((city) =>
    formattedTitle(city)
  );
  const dispatch = useDispatch();

  const [showCities, setShowCities] = useState(false);

  const onCitySelect = useCallback(
    (city: string) => {
      dispatch(
        setDestination({
          ...destination,
          cityId: city.toLowerCase(),
        })
      );

      setShowCities(false);
    },
    [destination, dispatch]
  );

  return (
    <SearchOptions
      shouldShow={showCities}
      setShouldShow={setShowCities}
      leftIcon={<RiRoadMapFill color={"var(--primaryThemeColor)"} />}
      onSelect={onCitySelect}
      options={whiteListCities}
      optionsIcon={<FaMapMarkerAlt color={"var(--primaryThemeColor)"} />}
      title={formattedTitle(destination.cityId)}
      inputPlaceholder={"Search"}
    />
  );
}

export default SearchCity;
