import React, { useEffect } from "react";
import {
  StepContent,
  Typography,
  Button,
  makeStyles,
  Step,
  StepLabel,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {STORE} from "../../STORE";
import usePrepareLink from "../../utils/usePrepareLink";
import { useNavLinks } from "../../STORE/constants";
import { useSelector } from "react-redux";
import { stateTypes } from "../../types";
import { getIsAffiliate } from "../../STORE/selectors";

interface schema {
  setActiveStep: (arg: number) => void;
}
export default function StepOne({ setActiveStep, ...rest }: schema) {
  const classes = useStyles();
  const isLoggedIn = useSelector(
    (state: stateTypes) => state.userInfo.isLoggedIn
  );
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      if (getIsAffiliate(STORE.getState())){
        setActiveStep(3);
      }else{
        setActiveStep(1)
      }
    }else{
      setActiveStep(0)
    };
  },[isLoggedIn, setActiveStep])
  

  const loginLink = usePrepareLink(useNavLinks.logIn);

  const onLoginPress = () => {
    if (isLoggedIn) {
      setActiveStep(1);
    } else history.push(loginLink);
  };

  return (
    <Step {...rest}>
      <StepLabel>Login</StepLabel>

      <StepContent >
        <Typography>
          You need to be logged in to apply for the affiliates program.
          <br />
          Click Next to login.
        </Typography>
        <div className={classes.actionsContainer}>
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white" }}
            onClick={onLoginPress}
            className={classes.button}
          >
            Next
          </Button>
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
