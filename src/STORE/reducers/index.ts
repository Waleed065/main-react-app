import { combineReducers } from "redux";

import servicesLoading from "./servicesLoading";
import serviceId from "./serviceId";
import headings from "./headings";
import title from "./title";
import categories from "./categories";
import allCategories from "./allCategories";
import cart from "./cart";
import items from "./items";
import whiteList from "./whiteList";
import destination from "./destination";

import comments from "./comments";
import ourServicesUrlValid from "./ourServicesUrlValid";
import chatRooms from "./chatRooms";
import chats from "./chats";

import pendingAds from "./pendingAds";
import activeAds from "./activeAds";
import userInfo from "./userInfo";
import reviews from "./reviews";
import favorites from "./favorites";
import orders from "./orders";
import alertModal from "./alertModal";
import addOns from "./addOns";
import snackBar from "./snackBar";
import currency from "./currency";
import affiliate from "./affiliate";

import { stateTypes } from "../../types";

export default combineReducers<stateTypes>({
  servicesLoading,
  headings,
  ourServicesUrlValid,
  title,
  reviews,
  categories,
  allCategories,
  addOns,
  cart,
  items,
  whiteList,
  destination,
  serviceId,
  comments,
  chatRooms,
  chats,
  pendingAds,
  activeAds,
  userInfo,
  favorites,
  orders,
  snackBar,
  alertModal,
  currency,
  affiliate
});
