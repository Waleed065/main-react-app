import React from "react";
import "./css/Message.css";
import { BsCheckAll } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import moment from "moment";


interface schema {
  from: boolean;
  content: string;
  createdAt: Date;
  error?: boolean;
}

export default function ImageMessage({
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
        <video controls className={"messageImage"}>
          <source src={content} type="video/mp4" />
          <source src={content} type="video/webm" />
          <source src={content} type="video/ogg" />
          <source src={content} type="media_type" />

          Your browser does not support the video tag.
        </video>

        <span className={"message-time"}>
        <label>{moment(createdAt).calendar()}</label>
          {!error ? <BsCheckAll /> : <BiErrorCircle />}
        </span>
      </span>
    </div>
  );
}
