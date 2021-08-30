import React, { useRef, useState } from "react";
import "./css/QuickChat.css";

import { AiFillWechat } from "react-icons/ai";
import ChatMain from "./ChatMain";
import { useDispatch, useSelector } from "react-redux";
import { stateTypes } from "../../types";
import { CSSTransition } from "react-transition-group";
import { clearAlert, setAlert } from "../../STORE/actions";
import { useHistory } from "react-router";
import usePrepareLink from "../../utils/usePrepareLink";
import { useNavLinks } from "../../STORE/constants";

export default function QuickChat() {
  const history = useHistory();

  const isLoggedIn = useSelector((state: stateTypes) => state.userInfo.isLoggedIn);
  const [showQuickChat, setShowQuickChat] = useState(false);
  const dispatch = useDispatch();
  const quickChatRef = useRef(null);

  const login = usePrepareLink(useNavLinks.logIn);

  const renderChatClick = () => {
    if (isLoggedIn) {
      setShowQuickChat(!showQuickChat);
    } else {
      dispatch(
        setAlert({
          head: "Log in required",
          message: "Kindly login to access chat!",
          leftButtonText: "Cancel",
          rightButtonText: "Login",
          onLeftButtonPress: () => dispatch(clearAlert()),
          onRightButtonPress: () => {
            dispatch(clearAlert());
            history.push(login);
          },
        })
      );
    }
  };
  return (
    <>
      <div id={"quickChat-box"} className={"quickChat-container"}>
        <CSSTransition
          nodeRef={quickChatRef}
          in={showQuickChat}
          timeout={300}
          classNames={"quickChat-transition"}
          unmountOnExit
        >
          <div id={"quickChat"} ref={quickChatRef}>
            <ChatMain />
          </div>
        </CSSTransition>
      </div>
      <span
        className={"quickChat-container button"}
        id={"quickChat-icon"}
        onClick={renderChatClick}
      >
        <AiFillWechat size={50} color={"white"} />
      </span>
    </>
  );
}
