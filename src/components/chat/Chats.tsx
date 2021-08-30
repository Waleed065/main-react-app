import React from "react";
import "./css/Chats.css";

import ChatInput from "./ChatInput";
import ChatBox from "./ChatBox";
import ChatCredentials from "./ChatCredentials";

interface schema {
  setShowChat: (arg: boolean) => void;
  currentChatId: string;
}
export default function Chats({ setShowChat, currentChatId }: schema) {
  return currentChatId ? (
    <div className={"chat-container"}>
      <ChatCredentials setShowChat={setShowChat} currentChatId={currentChatId} />
      <ChatBox currentChatId={currentChatId} />
      <ChatInput currentChatId={currentChatId} />
    </div>
  ) : null;
}
