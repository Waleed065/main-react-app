import React, { useRef, useState } from "react";
import "./css/NavBarSearch.css";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

import axios from "axios";
import { setSnackBar } from "../STORE/actions";
import { useDispatch, useSelector } from "react-redux";
import { stateTypes } from "../types";

interface schema {
  setOptions: (arg: string[]) => void;
  onSelect: (arg: string) => void;
}
export default function NavBarSearch({ setOptions, onSelect }: schema) {
  const serviceId = useSelector((state: stateTypes) => state.serviceId);
  const { countryId, cityId } = useSelector(
    (state: stateTypes) => state.destination
  );

  const [search, setSearch] = useState("");

  const searchOptionsRef = useRef(null);

  const dispatch = useDispatch();

  const timer = useRef<any>(null);

  const fetchSearch = (value: string) => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/search?q=${value}&service=${serviceId}&country=${countryId}&city=${cityId}`
      )
      .then((result) => {
        if (result.data.success) {
          const queries = result.data.result.map((obj: any) => obj.title);
          setOptions(queries);
        } else {
          dispatch(setSnackBar("Unable to search at the moment!"));
        }
      })
      .catch((err) => {
        dispatch(setSnackBar("Unable to search at the moment!"));
      });
  };

  const onChange = (e: any) => {
    setSearch(e.target.value);
    clearTimeout(timer.current);
    if (e.target.value.length > 2) {
      timer.current = setTimeout(() => {
        fetchSearch(e.target.value);
      }, 600);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const query = search.replace(/\//g, " ");
    onSelect(query);
    setSearch(query);
  };

  return (
    <form
      ref={searchOptionsRef}
      id={"navbarsearch-container"}
      onSubmit={onSubmit}
    >
      <div id={"navbarsearch-input-container"}>
        <span className={"button"} onClick={onSubmit}>
          <AiOutlineSearch size={20} color={"var(--textColor3)"} />
        </span>
        <input
          id={"navbarsearch-input"}
          placeholder="Search"
          autoComplete={"off"}
          value={search}
          onChange={onChange}
        />

        <span className={"button"} onClick={() => setSearch("")}>
          <AiOutlineClose size={20} color={"var(--textColor3)"} />
        </span>
      </div>
    </form>
  );
}
