import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setSnackBar } from "../../STORE/actions";
import { GET_PARAMS, GET_ENUMS } from "../../STORE/constants";
import { useHistory, useLocation } from "react-router";
import { stateTypes } from "../../types";
import useListners from "../../utils/useListners";

export default function ChooseARange() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const servicesLoading = useSelector(
    (state: stateTypes) => state.servicesLoading
  );
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const { filterBy } = useListners();

  useEffect(() => {
    if (filterBy && filterBy.startsWith(GET_ENUMS.filterBy.priceRange)) {
      const filterByArray = filterBy.split("-");
      const fromPrice = filterByArray[2];
      const toPrice = filterByArray[4];
      setFromValue(fromPrice);
      setToValue(toPrice);
    } else {
      setFromValue("");
      setToValue("");
    }
  }, [filterBy]);

  const applyRange = () => {
    const fromPrice = parseInt(fromValue);
    const toPrice = parseInt(toValue);
    if (!fromPrice || !toPrice) {
      return dispatch(setSnackBar("Kindly fill both the price ranges!"));
    }
    if (fromPrice > toPrice) {
      return dispatch(
        setSnackBar("Cap price should be greater than initial price!")
      );
    }
    const search = new URLSearchParams(location.search);

    search.set(
      GET_PARAMS.filterBy,
      `${GET_ENUMS.filterBy.priceRange}-${fromPrice}-to-${toPrice}`
    );

    history.push({
      pathname: location.pathname,
      search: search.toString() ? `?${search.toString()}` : "",
    });
  };

  return (
    <div id={"ourServices-items-filter-price"}>
      <span className={"ourServices-items-filter-flex-box"}>
        <input
          type="number"
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
        />
        <p className={"p-class"}>To</p>
        <input
          type="number"
          value={toValue}
          onChange={(e) => setToValue(e.target.value)}
        />
        <Button
          style={{ height: 25, marginBottom: 5 }}
          variant="outlined"
          color="primary"
          onClick={applyRange}
          disabled={servicesLoading}
        >
          Apply
        </Button>
      </span>
    </div>
  );
}
