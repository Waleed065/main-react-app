import React, { useState, useEffect, useRef, memo } from "react";
import "./css/Items.css";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  addToCart,
  addToFavorites,
  clearAlert,
  removeFromCart,
  removeFromFavorites,
  setAlert,
  setSnackBar,
  updateCart,
  // fetchServicesCategories,
} from "../../STORE/actions";
import { stateTypes, itemType, selectedAddOnType } from "../../types";
import usePrepareLink from "../../utils/usePrepareLink";
import { useNavLinks } from "../../STORE/constants";
import Calendars from "./Calendars";
import Clocks from "./Clocks";
import AddOnsModal from "../modal/AddOnsModal";
import classNames from "classnames";

import { staticPaths } from "../../STORE/constants";

const { itemPath } = staticPaths;

interface schema {
  categoryItem: itemType;
  isActive: boolean;
  isFavorite: boolean;
  setActiveAccordian: (arg: string) => void;
  isAdded: boolean;
}

const CategoryItems = ({
  categoryItem,
  isActive,
  isFavorite,
  setActiveAccordian,
  isAdded,
}: schema) => {
  const {
    _id,
    categoryId,
    countryId,
    cityId,
    serviceId,
    title,
    premium,
    pictures,
    price,
    about,
    addOns,
  } = categoryItem;
  const { currencyCode, exchangeRate } = useSelector(
    (state: stateTypes) => state.currency
  );
  const isLoggedIn = useSelector(
    (state: stateTypes) => state.userInfo.isLoggedIn
  );
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedAddOns, setSelectedAddOns] = useState<selectedAddOnType>([]);
  const [dateError, setDateError] = useState({
    state: false,
    helperText: "",
  });
  const additionalInfo = useRef<HTMLDivElement>(null);

  const history = useHistory();
  const loginLink = usePrepareLink(useNavLinks.logIn);
  const avatar = pictures[0];

  useEffect(() => {
    if (dateError.state) {
      dispatch(setSnackBar(dateError.helperText));
      if (isAdded) {
        dispatch(removeFromCart(cartBaby()));
      }
    }

    // eslint-disable-next-line
  }, [dateError.state]);

  useEffect(() => {
    if (isAdded && !dateError.state) {
      dispatch(updateCart(cartBaby()));
    }
    // eslint-disable-next-line
  }, [startDate, endDate, selectedAddOns]);

  const cartBaby = () => {
    return {
      avatar,
      about,
      premium,
      price,
      title,
      addOns: selectedAddOns,
      countryId,
      cityId,

      startDate,
      endDate,
      _id,
      serviceId,
      categoryId,
    };
  };

  const renderAddToCartButton = () => {
    if (dateError.state) {
      return dispatch(setSnackBar(dateError.helperText));
    }

    if (isAdded) {
      dispatch(removeFromCart(cartBaby()));
      isActive && setActiveAccordian("");
    } else {
      dispatch(addToCart(cartBaby()));
      setActiveAccordian(categoryId + _id);
    }
  };

  const loginRequired = () => {
    dispatch(
      setAlert({
        head: "Login Required",
        message: "You must login to proceed to this action!",
        leftButtonText: "Cancel",
        rightButtonText: "Login",
        onLeftButtonPress: () => dispatch(clearAlert()),
        onRightButtonPress: () => {
          dispatch(clearAlert());
          history.push(loginLink);
        },
      })
    );
  };

  const removeFavority = () => {
    if (!isLoggedIn) {
      return loginRequired();
    } else {
      dispatch(removeFromFavorites({ itemId: _id }));
    }
  };
  const addFavority = () => {
    if (!isLoggedIn) {
      return loginRequired();
    } else {
      dispatch(addToFavorites({ itemId: _id }));
    }
  };

  return (
    <div>
      <div className={"category-items-content"} tabIndex={1}>
        <img alt="#" src={avatar} className={"items-image"} />
        {premium && <h4 className={"premium items-premium"}>PREMIUM</h4>}
        <span className={"category-items-category-details"}>
          <span className={"category-items-category-heading-container"}>
            <Link to={`${itemPath}/${_id}`}>
              <label>{title}</label>
            </Link>
          </span>
          <p className={"smallFont2 item-details"}>{about}</p>
        </span>
        <div className={"category-items-category-coin"}>
          <h3>
            {currencyCode}-{(price * exchangeRate).toFixed(1)}/Night
          </h3>
          <span
            className={`item-cart-button no-select ${
              isAdded ? "remove-from-cart" : "add-to-cart"
            }`}
            onClick={renderAddToCartButton}
          >
            <span>
              <AiOutlineShoppingCart />
            </span>
            <label>{isAdded ? "Remove" : "Add To Cart"}</label>
          </span>
          <span className={"item-like-button button"}>
            {isFavorite ? (
              <span onClick={removeFavority}>
                <AiFillHeart />
              </span>
            ) : (
              <span onClick={addFavority}>
                <AiOutlineHeart />
              </span>
            )}
          </span>
        </div>
      </div>

      <CSSTransition
        nodeRef={additionalInfo}
        in={isActive}
        timeout={300}
        classNames="add-ons-transition"
        unmountOnExit
        appear
      >
        <div
          ref={additionalInfo}
          className={"category-items-additional no-select"}
        >
          <Calendars
            setError={setDateError}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            startDate={startDate}
            endDate={endDate}
          />
          <Clocks
            setError={setDateError}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            startDate={startDate}
            endDate={endDate}
          />
          {addOns.length && (
            <AddOnsModal
              addOns={addOns}
              selectedAddOns={selectedAddOns}
              setSelectedAddOns={setSelectedAddOns}
            />
          )}
        </div>
      </CSSTransition>

      <span
        className={"category-items-additional-button"}
        onClick={() =>
          !isActive
            ? setActiveAccordian(categoryId + _id)
            : setActiveAccordian("")
        }
      >
        {!isActive ? <FaChevronDown /> : <FaChevronUp />}
      </span>
    </div>
  );
};

export default memo(CategoryItems);

/* ----------------><----------------- */

export function ItemsSkeleton() {
  return (
    <>
      {new Array(5).fill(5).map((item, index) => (
        <div key={index}>
          <div className={"category-items-content"} tabIndex={1}>
            <Skeleton
              animation="wave"
              variant="rect"
              className={"items-image"}
            />
            <span className={"category-items-category-details"}>
              <span className={"category-items-category-heading-container"}>
                <Skeleton
                  animation="wave"
                  height={25}
                  width="40%"
                  style={{ marginBottom: 10 }}
                />
              </span>
              <Skeleton
                animation="wave"
                height={12}
                width="100%"
                style={{ marginBottom: 5 }}
              />
              <Skeleton
                animation="wave"
                height={12}
                width="100%"
                style={{ marginBottom: 5 }}
              />
              <Skeleton
                animation="wave"
                height={12}
                width="60%"
                style={{ marginBottom: 5 }}
              />
            </span>
          </div>

          <span
            className={classNames(
              "category-items-additional-button",
              "additional-button-skeleton"
            )}
          >
            <FaChevronDown />
          </span>
        </div>
      ))}
    </>
  );
}
