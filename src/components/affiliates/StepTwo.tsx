import React, { useRef } from "react";
import Compressor from "compressorjs";
import {
  StepContent,
  Typography,
  makeStyles,
  Grid,
  Paper,
  createStyles,
  Theme,
  Step,
  StepLabel,
  Button,
} from "@material-ui/core";
import { identityGood, messagesTypes } from "../../STORE/constants";
import EmailAndContact from "../EmailAndContact";
import { FaRegAddressCard } from "react-icons/fa";
import { BsCardList } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { stateTypes } from "../../types";
import { setSnackBar } from "../../STORE/actions";

interface picSchema {
  firebase: any;
  local: string;
}
interface schema {
  setActiveStep: (arg: number) => void;
  setLoading: (arg: boolean) => void;
  frontPic: picSchema;
  backPic: picSchema;
  setFrontPic: (arg: picSchema) => void;
  setBackPic: (arg: picSchema) => void;
}

export default function StepTwo({
  setActiveStep,
  setLoading,
  frontPic,
  backPic,
  setFrontPic,
  setBackPic,

  ...rest
}: schema) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { email, emailVerified, phoneNumber } = useSelector(
    (state: stateTypes) => state.userInfo
  );
  const frontPicChangePicRef = useRef<HTMLInputElement>(null);
  const backPicChangePicRef = useRef<HTMLInputElement>(null);

  const nextStep = () => {
    if (
      !emailVerified ||
      !email?.length ||
      !phoneNumber?.length ||
      !frontPic.local.length ||
      !backPic.local.length
    ) {
      return dispatch(setSnackBar("Please fill all the fields to verify."));
    }

    setActiveStep(2);
  };

  const onPictureChange = ({
    e,
    which,
  }: {
    e: any;
    which: "front" | "back";
  }) => {
    if (!e.target?.files?.length) return;
    const file = e.target.files[0];
    const type = file?.type?.split("/").shift().toLowerCase();
    if (type !== messagesTypes.image) {
      return dispatch(setSnackBar(`File type ${type} not supported!`));
    }
    new Compressor(file, {
      quality: 0.6,
      success: (res) => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = (E: any) => {
          switch (which) {
            case "front":
              setFrontPic({
                firebase: res,
                local: E.target.result,
              });
              break;
            case "back":
              setBackPic({
                firebase: res,
                local: E.target.result,
              });
              break;
          }
        };
      },
    });
  };

  return (
    <>
      <Step {...rest}>
        <StepLabel>Verify your identity</StepLabel>

        <StepContent>
          <EmailAndContact />
          <Grid container spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                className={classes.imageContainer}
                onClick={() => frontPicChangePicRef.current?.click()}
              >
                {frontPic.local.length > 0 ? (
                  <img
                    className={classes.img}
                    src={frontPic.local}
                    alt={"back-id-pic"}
                  />
                ) : (
                  <>
                    <FaRegAddressCard
                      size={50}
                      color={"var(--primaryThemeColor)"}
                    />
                    <Typography variant="h6" className={classes.pictureText}>
                      Upload front picture of id/passport/driving-license
                    </Typography>
                  </>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                className={classes.imageContainer}
                onClick={() => backPicChangePicRef.current?.click()}
              >
                {backPic.local.length > 0 ? (
                  <img
                    className={classes.img}
                    src={backPic.local}
                    alt={"back-id-pic"}
                  />
                ) : (
                  <>
                    <BsCardList size={50} color={"var(--primaryThemeColor)"} />
                    <Typography variant="h6" className={classes.pictureText}>
                      Upload back picture of id/passport/driving-license
                    </Typography>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
          <Paper elevation={1} className={classes.verifyIdPaper}>
            <img
              src={identityGood}
              alt={"identity"}
              width={"100%"}
              height={"100%"}
            />
          </Paper>

          <div className={classes.actionsContainer}>
            <Button
              variant="contained"
              color="primary"
              style={{ color: "white" }}
              onClick={nextStep}
              className={classes.button}
            >
              Next
            </Button>
          </div>
        </StepContent>
      </Step>
      <input
        ref={frontPicChangePicRef}
        style={{ display: "none" }}
        type={"file"}
        accept="image/*"
        onChange={(e) => onPictureChange({ e, which: "front" })}
      />
      <input
        ref={backPicChangePicRef}
        style={{ display: "none" }}
        type={"file"}
        accept="image/*"
        onChange={(e) => onPictureChange({ e, which: "back" })}
      />
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: 10,
      marginRight: 10,
    },
    actionsContainer: {
      marginBottom: 10,
    },

    verifyIdPaper: {
      marginTop: 20,
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // height: 100,
      aspectRatio: "10/1",
      padding: 5,
      [theme.breakpoints.only("sm")]: {
        aspectRatio: "5/1",
      },
      [theme.breakpoints.only("xs")]: {
        aspectRatio: "4/1",
      },
    },

    imageContainer: {
      aspectRatio: "16/9",

      // height: 250,
      border: "1px dashed var(--primaryThemeColor)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      backgroundColor: "#e9e9e9",
    },
    gridContainer: {
      marginTop: 10,
    },
    pictureText: {
      color: "var(--primaryThemeColor)",
      textAlign: "center",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  })
);
