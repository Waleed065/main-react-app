import React from "react";
import './css/NotFound.css';
import { CgUnavailable } from "react-icons/cg";


interface schema{
  heading: string;
  message: string;
}
export default function NotFound({heading, message}:schema) {
  return (
    <div id={"ourServices-not-found"}>
      <span>
        <CgUnavailable size={50} />
      </span>
      <h2>{heading}</h2>
      <p>{message}</p>
    </div>
  );
}
