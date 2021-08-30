import React, { useState, useEffect } from "react";

import { GET_ENUMS } from "../../STORE/constants";

import useGetPopupState from "../../utils/useGetPopupState";
import LogInModal from "./LogInModal";
import LogOutModal from "./LogOutModal";
import ContactUsModal from "./ContactUsModal";
import ReceiptModal from './ReceiptModal';
import { useSelector } from "react-redux";
import { stateTypes } from "../../types";
import { modalAnimationTimeOut } from "../../STORE/constants";

const globalPopups = {
  [GET_ENUMS.show.contactUs]: ContactUsModal,
};
const loginPopups = {
  [GET_ENUMS.show.logOut]: LogOutModal,
  [GET_ENUMS.show.receipt]: ReceiptModal,
  ...globalPopups,
};
const logoutPopups = {
  [GET_ENUMS.show.logIn]: LogInModal,
  ...globalPopups,
};

const GetParameterPopups = () => {
  const isLoggedIn = useSelector((state: stateTypes) => state.userInfo.isLoggedIn);

  const [logInStatus, setLogInStatus] = useState<boolean>(isLoggedIn);
  const { mountedPopup, isOpen } = useGetPopupState();
  
  useEffect(() => {
    setTimeout(() => {
      setLogInStatus(isLoggedIn);
    }, modalAnimationTimeOut);
  }, [isLoggedIn]);

  const Component = logInStatus
    ? loginPopups[mountedPopup ?? ""]
    : logoutPopups[mountedPopup ?? ""];

  if (!Component) {
    return null;
  }

  return <Component isOpen={isOpen} />;
};

export default GetParameterPopups;
