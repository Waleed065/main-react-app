import React from "react";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import { Divider, Stepper } from "@material-ui/core";
import { useSelector } from "react-redux";
import { stateTypes } from "../../types";


interface schema {
  onPriceChange: (value: string) => void;
  onAboutChange: (value: string) => void;
}
export default function VerticalLinearStepper({
  onPriceChange,
  onAboutChange,
}: schema) {
  const currency = useSelector(
    (state: stateTypes) => state.currency.currencyCode
  );

  return (
    <>
      <Stepper orientation="vertical">
        <Step active={true}>
          <StepLabel>Price ({currency})</StepLabel>
          <StepContent>
            <input
              placeholder={"5"}
              onChange={(e) => onPriceChange(e.target.value)}
              type="number"
              min='0'
              className={"form-input"}
              style={{ margin: 0 }}
            />
          </StepContent>
        </Step>
        <Step active={true}>
          <StepLabel>About</StepLabel>
          <StepContent>
            <textarea
              placeholder={"Tell Us About This Add On..."}
              onChange={(e) => onAboutChange(e.target.value)}
              className={"post-ad-textarea"}
              style={{ margin: 0 }}
            />
          </StepContent>
        </Step>
      </Stepper>

      <Divider />
    </>
  );
}
