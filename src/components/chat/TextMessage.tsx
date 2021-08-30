import React from "react";
import "./css/Message.css";
import { BsCheckAll } from "react-icons/bs";
import moment from "moment";
import { BiErrorCircle } from "react-icons/bi";

interface schema {
  from: boolean;
  content: string;
  createdAt: Date;
  error?: boolean;
}
export default function TextMessage({
  from,
  content,
  createdAt,
  error,
}: schema) {
  return (
    <div
      className={`message-container ${
        from ? "otherMessage-container" : "selfMessage-container"
      }`}
    >
      <span className={"message"}>
        <p>{content}</p>
        <span className={"message-time"}>
          {/* <label>{moment(createdAt).fromNow()}</label> */}
          <label>{moment(createdAt).calendar()}</label>
          {!error ? <BsCheckAll /> : <BiErrorCircle />}
        </span>
      </span>
    </div>
  );
}
