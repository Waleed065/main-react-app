import React from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import { messagesTypes } from "../../STORE/constants";
import { messageSchema, stateTypes } from "../../types";
import ImageMessage from "./ImageMessage";
import TextMessage from "./TextMessage";
import VideoMessage from "./VideoMessage";

interface schema {
  msg: messageSchema;
}
const MessageComponent = ({ msg }: schema) => {
  const userId = useSelector((state: stateTypes) => state.userInfo?._id);

  const { _id, from, type, content, createdAt, error } = msg;

  switch (type) {
    case messagesTypes.text:
      return (
        <TextMessage
          key={_id}
          from={from !== userId}
          content={content}
          createdAt={createdAt}
          error={error}
        />
      );
    case messagesTypes.image:
      return (
        <ImageMessage
          key={_id}
          from={from !== userId}
          content={content}
          createdAt={createdAt}
          error={error}
        />
      );
    case messagesTypes.video:
      return (
        <VideoMessage
          key={_id}
          from={from !== userId}
          content={content}
          createdAt={createdAt}
          error={error}
        />
      );
    default:
      return null;
  }
};

export default memo(MessageComponent);
