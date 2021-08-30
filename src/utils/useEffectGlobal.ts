import { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { batch, useDispatch } from "react-redux";
import {
  verifyUser,
  removeUserInfo,
  disconnectSocket,
  setAffiliateId,
  clearAffiliateInfo,
} from "../STORE/actions";

// should only import in Navigation.tsx
export default function useEffectGlobal() {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((result) => {
          if (result.claims.aid?.length > 0) {
            dispatch(setAffiliateId(result.claims.aid));
          }
        });
        dispatch(verifyUser());
      } else {
        batch(() => {
          dispatch(removeUserInfo());
          dispatch(clearAffiliateInfo());
        });
      }
    });
    return () => {
      subscriber();
      disconnectSocket();
    };
    // eslint-disable-next-line
  }, []);
}
