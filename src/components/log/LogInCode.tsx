import React, { useRef } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from "react-router-dom";

import ReactCodeInput from "react-verification-code-input";
import { setSnackBar } from "../../STORE/actions";
import { promiseSchema,  } from "../../types";
import { useDispatch } from "react-redux";

declare const window: any;
interface schema extends promiseSchema {
  setVerifyCodeFalse: () => void;
  linkToCurrentUser?: boolean;
  setLoading: (arg: boolean) => void;
  loading: boolean
}
export default function LogInCode({
  setVerifyCodeFalse,
  linkToCurrentUser,
  setLoading,
  Then,
  loading
}: schema) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  // const [codeWidth, setCodeWidth] = useState<number>(40);
  const codeRef = useRef<ReactCodeInput>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const offsetWidth = codeContainerRef.current?.clientWidth;
  //   if (offsetWidth) {
  //     setCodeWidth(offsetWidth / 6);
  //   }
  // }, []);


  const handleVerifyCode = (code: string) => {
    setLoading(true)
    const login = () => {
      window.confirmationResult
        ?.confirm(code)
        .then(() => {
          history.push(location.pathname);
        })
        .catch((error: any) => {
          codeRef.current?.__clearvalues__();
          setLoading(false)

          dispatch(setSnackBar("Invalid Code!"));
          console.log(error);
        });
    };

    const linkAccount = () => {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        window.confirmationResult,
        code
      );
      firebase
        .auth()
        .currentUser?.linkWithCredential(credential)
        .then(() => {
          dispatch(setSnackBar('Successfully linked contact with account'))
          Then?.();
        })
        .catch((error) => {
          dispatch(setSnackBar(error.message));
        });
    };

    linkToCurrentUser ? linkAccount() : login();
  };

  return (
    <div className={"log-form"}>
      <h1>{linkToCurrentUser ? "Link Account" : "Log In"}</h1>
      <h3>Verify Code</h3>
      <div ref={codeContainerRef} className={"phone-input"}>
        <ReactCodeInput
          className={"codeInput"}
          type={"number"}
          fieldHeight={50}
          fieldWidth={"16.6666%"}
          fields={6}
          // onChange={(e) => console.log(e)}
          ref={codeRef}
          onComplete={handleVerifyCode}
          required={true}
          loading={loading}
        />
      </div>

      <div className={"checkbox"}>
        <p>We've Sent You An Sms Verification Code!</p>
      </div>

      <button
        className={"button themeButton"}
        disabled={loading}
        onClick={setVerifyCodeFalse}
      >
        Re-Enter Number
      </button>
    </div>
  );
}
