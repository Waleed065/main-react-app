import React from "react";
import "./css/ChatScreen.css";

import ChatMain from "../components/chat/ChatMain";

export default function Chat() {
  return (
    <div id={"chat-screen-container"} className={"fade-in"}>
      <ChatMain />
    </div>
  );
}
