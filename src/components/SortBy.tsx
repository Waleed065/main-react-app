import React, { useState } from "react";
import { MdAttachment, MdSort } from "react-icons/md";
import { useHistory, useLocation } from "react-router";

import { GET_ENUMS, GET_PARAMS } from "../STORE/constants";
import useGetParameter from "../utils/useGetParameter";
import SearchOptions from "./SearchOptions";

const filterByCrumbs = {
  [GET_ENUMS.sortBy.priceLowToHigh]: "Price: Low to High",
  [GET_ENUMS.sortBy.priceHighToLow]: "Price: High to Low",
  [GET_ENUMS.sortBy.averageRating]: "Ratings",
  [GET_ENUMS.sortBy.datePublished]: "Date Published",
};

export default function SortBy(): JSX.Element {
  const [showSortBy, setShowSortBy] = useState(false);
  
  const urlSortBy = useGetParameter(GET_PARAMS.sortBy);
  const sortBy = urlSortBy ?? GET_ENUMS.sortBy.datePublished;

  const history = useHistory();
  const location = useLocation();
  
  
  // const dispatch = useDispatch();

  const onSelect = (arg: string) => {
    const filterValue = Object.keys(filterByCrumbs).find(
      (key) => filterByCrumbs[key] === arg
    );
    setShowSortBy(false);
    if (filterValue) {
      let query;
      switch(filterValue){
        case GET_ENUMS.filterBy.onlyPremium:
          query = GET_PARAMS.filterBy;
          break;
        case GET_ENUMS.filterBy.onlyNonPremium:
          query = GET_PARAMS.filterBy;
          break;
        default: query = GET_PARAMS.sortBy;
      }
      
      const search = new URLSearchParams(location.search);

      search.set(query, `${filterValue}`);
  
      history.push({
        pathname: location.pathname,
        search: search.toString() ? `?${search.toString()}` : "",

      });
    }
  };

  return (
    <SearchOptions
      title={filterByCrumbs[sortBy]}
      options={Object.values(filterByCrumbs)}
      shouldShow={showSortBy}
      setShouldShow={setShowSortBy}
      onSelect={onSelect}
      inputPlaceholder={"Sort By..."}
      optionsIcon={<MdAttachment />}
      leftIcon={<MdSort />}
    />
  );
}
