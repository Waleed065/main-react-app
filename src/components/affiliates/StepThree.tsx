import React from "react";
import {
  StepContent,
  Button,
  makeStyles,
  Step,
  StepLabel,
} from "@material-ui/core";
import TransferList from "./TransferList";
import InputOptions from "./InputOptions";

interface schema {
  setActiveStep: (arg: number) => void;
  choices: string[];
  setChoices: (arg: any) => void;
  setWebsiteName: (arg: string) => void;
  setWebsiteUrl: (arg: string) => void;
  setPromoCode: (arg: string) => void;
  onSubmit: () => void;
  setIndustry: (arg: string) => void;
  industry: string;
  acceptAgreement: boolean;
  setAcceptAgreement: (arg: boolean) => void;
}
export default function StepThree({
  setActiveStep,
  choices,
  setChoices,
  setWebsiteName,
  setWebsiteUrl,
  setPromoCode,
  onSubmit,
  industry,
  setIndustry,
  acceptAgreement,
  setAcceptAgreement,
  ...rest
}: schema) {
  const classes = useStyles();

  return (
    <Step {...rest}>
      <StepLabel>Choose your interests</StepLabel>

      <StepContent>
        <TransferList choices={choices} setChoices={setChoices} />

        <InputOptions
          setWebsiteName={setWebsiteName}
          setWebsiteUrl={setWebsiteUrl}
          setPromoCode={setPromoCode}
          industry={industry}
          setIndustry={setIndustry}
          acceptAgreement={acceptAgreement}
          setAcceptAgreement={setAcceptAgreement}
        />

        <div className={classes.actionsContainer}>
          <div>
            <Button
              // disabled={activeStep === 0}
              onClick={() => setActiveStep(1)}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ color: "white" }}
              onClick={onSubmit}
              className={classes.button}
            >
              Submit
            </Button>
          </div>
        </div>
      </StepContent>
    </Step>
  );
}

const useStyles = makeStyles({
  button: {
    marginTop: 10,
    marginRight: 10,
  },
  actionsContainer: {
    marginBottom: 10,
  },
});
