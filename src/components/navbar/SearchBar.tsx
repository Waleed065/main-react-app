import React, { useEffect, useState } from "react";
import "./css/SearchBar.css";
import CountryOptionSearchBar from "./CountryOptionSearchBar";
import ServiceOptionSearchBar from "./ServiceOptionSearchBar";
import SearchOptionSearchBar from "./SearchOptionSearchBar";
import CityOptionSearchBar from "./CityOptionSearchBar";

interface schema {
  childrenRef: React.RefObject<any>;
  setShouldShow: (arg: boolean) => void;
  setSecondaryNav: (arg: boolean) => void
}
export default function SearchBar({ childrenRef, setShouldShow, setSecondaryNav }: schema) {
  const [showServices, setShowServices] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  
  useEffect(() => {
    const listner = (e: any) => {
      if (!childrenRef.current?.contains(e.target)) {
        setShouldShow(false);
      }
    };
    window.addEventListener("mouseup", listner);
    return () => window.removeEventListener("mouseup", listner);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const listner = () => {
      setShouldShow(false);
    };
    window.addEventListener("scroll", listner);

    return () => {
      window.removeEventListener("scroll", listner);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div id="search-bar-container">
      <ServiceOptionSearchBar
        showServices={showServices}
        setShowServices={setShowServices}
        setShowCountries={setShowCountries}
      />

      <div className={"search-bar-divider"} />
      <CountryOptionSearchBar
        showCountries={showCountries}
        setShowCountries={setShowCountries}
        setShowCities={setShowCities}
      />
      <div className={"search-bar-divider"} />
      <CityOptionSearchBar
        showCities={showCities}
        setShowCities={setShowCities}
        setShowSearch={setShowSearch}
      />

      <div className={"search-bar-divider"} />

      <SearchOptionSearchBar
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        setSecondaryNav={setSecondaryNav}
      />
    </div>
  );
}
