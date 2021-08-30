import React, { useEffect, useState } from "react";
import { promiseSchema } from "../../types";
import ActivityIndicator from "../ActivityIndicator";
import "./css/Log.css";

import LogInCode from "./LogInCode";
import LogInNumber from "./LogInNumber";

export default function VerifyContactNumber({ Then }: promiseSchema) {
  const [loading, setLoading] = useState(false);
  const [verifyCode, setVerifyCode] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <div className={"log-container"}>
      <ActivityIndicator loading={loading} />
      <div id={"log-image-container"}>
        <img
          src="https://i.pinimg.com/originals/8f/26/6d/8f266d1e455ca21055247f7a3304fdb2.jpg"
          alt="img"
        />
      </div>
      {!verifyCode ? (
        <LogInNumber
          linkToCurrentUser={true}
          setVerifyCodeTrue={() => setVerifyCode(true)}
          setLoading={setLoading}
          loading={loading}
        />
      ) : (
        <LogInCode
          linkToCurrentUser={true}
          setVerifyCodeFalse={() => setVerifyCode(false)}
          Then={Then}
          setLoading={setLoading}
          loading={loading}
        />
      )}
    </div>
  );
}
