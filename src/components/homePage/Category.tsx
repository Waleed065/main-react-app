import React from "react";
import "./css/Category.css";

import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setTitle } from "../../STORE/actions";
import { categoriesItemType } from "../../types";
import {staticPaths} from '../../STORE/constants';


const {itemsPath} = staticPaths;


interface schema {
  categoryDetails: categoriesItemType;
  setShowCategory: (arg: boolean) => void;
}

const Category = ({ categoryDetails, setShowCategory }:schema) => {
  const { avatar, title, about, countryId, cityId, serviceId, _id:categoryId } =
    categoryDetails;

  const dispatch = useDispatch();

  const renderCategoryPress = () => {
    dispatch(
      setTitle({
        shouldFetch: false,
        servicesTitle: {
          serviceId,
          categoryId,
          countryId,
          cityId
        },
      })
    );
    setShowCategory(false);
  };


  return (
    <div
      onClick={renderCategoryPress}
      className={"selection-search-category"}
    >
      <img
        className={"selection-search-category-img"}
        alt={"#"}
        src={avatar ?? undefined}
      />
      <div className={"selection-search-category-overview"}>
        <h3>{title}</h3>
        <p>{about}</p>
        {/* {price && (
          <div className={"selection-search-category-overview-rate"}>
            <span>Starting from</span>
            <h3>{currencyCode}-{(price *  exchangeRate).toFixed()}</h3>
          </div>
        )} */}
      </div>

      <Link
        to={`${itemsPath}/${categoryId}?service=${serviceId}&country=${countryId}&city=${cityId}`}
        className={"selection-search-category-details"}
      >
        <span>See Details</span>
      </Link>
      <FaChevronRight />
    </div>
  );
};

export default Category;
