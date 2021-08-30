import React, { useState, useEffect, memo } from "react";
import Searchoptions from "./SearchOptions";
import { countries } from "../utils/countries";

const options = countries.map(
  (country) => country.emoji + " " + country.callingCodes[0]
);

interface schema {
  countryCode: string;
  setCountryCode: (arg: string) => void;
}

function SearchSelection({ countryCode, setCountryCode }: schema) {
  const [flag, setFlag] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setCountryCode("+92");
    setFlag("🇵🇰");
    // eslint-disable-next-line
  }, []);

  const onSelect = (arg: string) => {
    const [flag, code] = arg.split(' ');
    setCountryCode(code);
    setFlag(flag);
    setShow(false);
  };

  return (
    <Searchoptions
      title={countryCode}
      leftIcon={<label>{flag}</label>}
      onSelect={onSelect}
      inputPlaceholder={"Search..."}
      options={options}
      shouldShow={show}
      setShouldShow={setShow}
      button
      barStyle={{
        marginRight: 10,
      }}
      optionsContainerStyle={{ left: 0 }}
    />
  );
}
export default memo(SearchSelection);
