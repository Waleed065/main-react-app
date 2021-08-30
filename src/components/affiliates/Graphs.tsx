import React from "react";
import "./css/Graphs.css";
import DateInputHost from "./DateInputHost";

export default function Graphs() {
  return (
    <div className={"graphs-container"}>
      <div className="graph-options">
        <DateInputHost />
      </div>
    </div>
  );
}
