import React from "react";
import { useState } from "react";
import LogInCode from "./LogInCode";
import LogInNumber from "./LogInNumber";

interface logSchema {
  setLoading: (arg: boolean) => void;
  loading: boolean;
}
export default function LogInByNumber({ setLoading, loading }: logSchema) {
  const [verifyCode, setVerifyCode] = useState(true);

  return (
    <>
      {!verifyCode ? (
        <LogInNumber
          setVerifyCodeTrue={() => setVerifyCode(true)}
          setLoading={setLoading}
          loading={loading}
        />
      ) : (
        <LogInCode
          setVerifyCodeFalse={() => setVerifyCode(false)}
          setLoading={setLoading}
          loading={loading}
        />
      )}
    </>
  );
}
