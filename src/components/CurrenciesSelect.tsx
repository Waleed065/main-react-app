import React, { useState } from "react";
import SearchOptions from "./SearchOptions";
import { FaMoneyBillAlt } from "react-icons/fa";
import { countries } from "../utils/countries";

import { useDispatch, useSelector } from "react-redux";
import { stateTypes } from "../types";
import { currencyPanYuk } from "../STORE/actions";

// const from = "USD";
// const to = "PKR";
// const amount = "1";

// const UsdToPkr = `http://data.fixer.io/api/${endpoint}?access_key=${access_key}&from${from}&to${to}&amount${amount}`;

const currencies = countries.map((country) => country.currencyCode);
const options = currencies.filter(
  (currency, index) =>
    currency.length > 0 && currencies.indexOf(currency) === index
);

export default function CurrenciesSelect(): JSX.Element {
  const { currencyCode } = useSelector((state: stateTypes) => state.currency);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const selectCurrency = (currency: string) => {
    dispatch(currencyPanYuk(currency));
    setShow(false);
  };

  return (
    <SearchOptions
      title={currencyCode.toUpperCase()}
      leftIcon={<FaMoneyBillAlt />}
      onSelect={selectCurrency}
      inputPlaceholder={"Search..."}
      options={options}
      optionsIcon={<FaMoneyBillAlt color={"var(--primaryThemeColor)"} />}
      shouldShow={show}
      setShouldShow={setShow}
      button
      barStyle={{
        height: 35,
        color: "white",
        border: "1px dashed white",
        borderRadius: 5,
        fontWeight: 450,
      }}
      optionsContainerStyle={{ top: 50 }}
    />
  );
}
