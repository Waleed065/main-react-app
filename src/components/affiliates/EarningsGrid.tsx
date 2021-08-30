import React from "react";
import "./css/EarningsGrid.css";
import { IconButton, Tooltip } from "@material-ui/core";
import { AiFillQuestionCircle } from "react-icons/ai";

export default function EarningsGrid() {
  return (
    <div className="grid-3">
      <div className="card-med">
        <strong>Unpaid earnings</strong>
        <Tooltip
          title="Total amount of unpaid earnings to date."
          arrow={true}
          placement={"top"}
        >
          <IconButton style={{ padding: 5, margin: 5 }}>
            <AiFillQuestionCircle />
          </IconButton>
        </Tooltip>
        <div>
          <strong>$0.00</strong>
        </div>
      </div>
      <div className="card-med">
        <strong>Paid earnings</strong>
        <Tooltip
          title="Total amount of paid out commission to date."
          arrow={true}
          placement={"top"}
        >
          <IconButton style={{ padding: 5, margin: 5 }}>
            <AiFillQuestionCircle />
          </IconButton>
        </Tooltip>
        <div>
          <strong>$0.00</strong>
        </div>
      </div>
      <div className="card-med">
        <strong>Next payment round</strong>
        <Tooltip
          title="Projected amount of commission payout at the next payment date."
          arrow={true}
          placement={"top"}
        >
          <IconButton style={{ padding: 5, margin: 5 }}>
            <AiFillQuestionCircle />
          </IconButton>
        </Tooltip>
        <div>
          <strong>$0.00</strong>
        </div>
      </div>
    </div>
  );
}
