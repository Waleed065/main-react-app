import React from "react";
import "./css/Count.css";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface countSchema {
  count: number;
  setCount: (arg: number) => void;
}

export default function Count({ count, setCount }: countSchema) {
  return (
    <span className={"count-container"}>
      <button
        className={"button"}
        disabled={count < 2}
        onClick={() => setCount(count-1)}
      >
        <AiOutlineMinus className={"count-button"} size={22} />
      </button>
      <span className={"count-number"}>{count}</span>
      <button
        className={"button"}
        disabled={count > 9}
        onClick={() => setCount(count+1)}
      >
        <AiOutlinePlus className={"count-button"} size={22} />
      </button>
    </span>
  );
}
