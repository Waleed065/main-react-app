import React, { useState } from "react";
import "./css/Affiliates.css";
import firebase from "firebase/app";
import "firebase/auth";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import classNames from "classnames";

import ActivityIndicator from "../components/ActivityIndicator";
import FooterContainer from "../components/FooterContainer";
import StepOne from "../components/affiliates/StepOne";
import StepTwo from "../components/affiliates/StepTwo";
import StepThree from "../components/affiliates/StepThree";
import AffiliatesVideo from "../components/affiliates/AffiliatesVideo";
import AffiliatesStaticCards from "../components/affiliates/AffiliatesStaticCards";
import AffiliatesStaticIntigration from "../components/affiliates/AffiliatesStaticIntigration";
import AffiliatesCongradulations from "../components/affiliates/AffiliatesCongradulations";
import { requestJoinAffiliatesProgram, setSnackBar } from "../STORE/actions";
import { useDispatch } from "react-redux";
import { defaultUserInfo } from "../types";

interface picSchema {
  firebase: any;
  local: string;
}
export default function Affiliates() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);
  const [websiteName, setWebsiteName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [industry, setIndustry] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [acceptAgreement, setAcceptAgreement] = useState(false);
  const [frontPic, setFrontPic] = useState<picSchema>({
    firebase: "",
    local: "",
  });
  const [backPic, setBackPic] = useState<picSchema>({
    firebase: "",
    local: "",
  });


  const onSubmit = () => {
    const { email, emailVerified, phoneNumber } =
      firebase.auth().currentUser ?? defaultUserInfo;

    if (!emailVerified) {
      return dispatch(setSnackBar("Email Not Verified!"));
    } else if (!email?.includes("@")) {
      return dispatch(setSnackBar("Invalid Email!"));
    } else if (!Boolean(phoneNumber?.length)) {
      return dispatch(setSnackBar("Invalid Phone Number!"));
    } else if (frontPic.local.length === 0 || backPic.local.length === 0) {
      return dispatch(
        setSnackBar("Please Provide Identity Verification Photos!")
      );
    } else if (choices.length === 0) {
      return dispatch(setSnackBar("Please Choose Your Affliations!"));
    } else if (websiteName.length === 0) {
      return dispatch(
        setSnackBar("Please Provide A Valid Name For Your Website!")
      );
    } else if (websiteUrl.length === 0) {
      return dispatch(
        setSnackBar("Please Provide A Valid URL For Your Website!")
      );
    } else if (industry.length === 0) {
      return dispatch(
        setSnackBar("Please Provide A Valid Option For Your Industry!")
      );
    } else if (!acceptAgreement) {
      return dispatch(
        setSnackBar(
          "Please Accept the Affiliate Partner Agreement To Continue!"
        )
      );
    }

    setLoading(true);
    dispatch(
      requestJoinAffiliatesProgram({
        pictures: [frontPic, backPic],
        affiliations: choices,
        websiteName,
        websiteUrl,
        industry,
        promoCode,
        Then: () => {
          setLoading(false);
          setActiveStep(3);
        },
        Catch: () => setLoading(false),
        InvalidRequest: () => setLoading(false),
      })
    );
  };

  return (
    <>
      <AffiliatesVideo />

      <div
        id={"affiliates-container"}
        className={classNames(classes.root, "fade-in")}
      >
        <ActivityIndicator loading={loading} />
        <h2 style={{ textAlign: "center", color: "var(--primaryThemeColor)" }}>
          Become Our Affiliate
        </h2>

        <Stepper activeStep={activeStep} orientation="vertical">
          <StepOne setActiveStep={setActiveStep} />

          <StepTwo
            setActiveStep={setActiveStep}
            setLoading={setLoading}
            frontPic={frontPic}
            setFrontPic={setFrontPic}
            backPic={backPic}
            setBackPic={setBackPic}
          />

          <StepThree
            setActiveStep={setActiveStep}
            choices={choices}
            setChoices={setChoices}
            setWebsiteName={setWebsiteName}
            setWebsiteUrl={setWebsiteUrl}
            setPromoCode={setPromoCode}
            onSubmit={onSubmit}
            industry={industry}
            setIndustry={setIndustry}
            acceptAgreement={acceptAgreement}
            setAcceptAgreement={setAcceptAgreement}
          />
        </Stepper>
        {activeStep === 3 && <AffiliatesCongradulations />}
      </div>

      <AffiliatesStaticCards />
      <AffiliatesStaticIntigration />
      <FooterContainer />
    </>
  );
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});
