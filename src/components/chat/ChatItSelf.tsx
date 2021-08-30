import React, { memo } from "react";
import "./css/ChatItSelf.css";
import { memberDetailsSchema, stateTypes } from "../../types";
import { useSelector } from "react-redux";
import { getLastMessage } from "../../STORE/selectors";
import { noDisplay } from "../../STORE/constants";
import chatContent from "../../utils/chatContent";
import moment from "moment";

interface schema {
  chatId: string;
  chatDetails: memberDetailsSchema[];

  active: boolean;
  onChatClick: (arg: string) => void;
}

const ChatItSelf = ({ chatId, chatDetails, active, onChatClick }: schema) => {
  const { type, content, createdAt } = useSelector((state: stateTypes) =>
    getLastMessage(state, chatId)
  );
  const { displayName = "", photoURL = "" } = chatDetails?.[0] ?? {};

  return (
    <div
      className={`chatItSelf-container ${
        active ? "active-chatItSelf" : undefined
      }`}
      onClick={() => onChatClick(chatId)}
    >
      <img src={photoURL || noDisplay} alt="profile" width={80} height={80} />
      <div className={"chatItSelf-details-container"}>
        <div className={"chatItSelf-details"}>
          <label>{displayName || "Unknown"}</label>
        </div>
        <div className={"chatItSelf-details"}>
          <span className={"chatItSelf-content"}>
            {chatContent({ type, content })}
          </span>
          <span></span>
        </div>
        <div className={"chatItSelf-details"}>
          <span className={"chatItSelf-date"}>
            {moment(createdAt).calendar()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatItSelf);
