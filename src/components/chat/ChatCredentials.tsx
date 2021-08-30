import React from "react";
import "./css/ChatCredentials.css";

import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getCurrentChat } from "../../STORE/selectors";
import { noDisplay } from "../../STORE/constants";
import { stateTypes } from "../../types";

interface schema {
  setShowChat: (arg: boolean) => void;
  currentChatId: string;
}
export default function ChatCredentials({
  setShowChat,
  currentChatId,
}: schema) {
  const { displayName, photoURL } = useSelector((state: stateTypes) =>
    getCurrentChat(state, currentChatId)
  );
  return (
    <div className={"chatCredentials-container"}>
      <span id={"chatCredentials-back-icon"} onClick={() => setShowChat(false)}>
        <IoArrowBack />
      </span>

      <img src={photoURL || noDisplay} alt="chat" />
      <div className={"chatCredentials-details-container"}>
        <div className={"chatCredentials-details"}>
          <label>{displayName || "Unknown"}</label>
          {/* <span>2:30PM</span> */}
        </div>
        <div className={"chatCredentials-details"}>
          {/* <span>Hahahaha ...</span> */}
          {/* <span>
          </span> */}
        </div>
      </div>
    </div>
  );
}
