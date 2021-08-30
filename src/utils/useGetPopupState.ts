import { useState, useEffect, useMemo, useRef } from "react";

import { GET_PARAMS } from "../STORE/constants";
import useGetParameter from "./useGetParameter";
import {modalAnimationTimeOut} from '../STORE/constants';

export default function useGetPopupState() {
  const showName = useGetParameter(GET_PARAMS.show);
  const [mountedPopup, setMountedPopup] = useState(showName);

  const timeout = useRef<any>(null);
  useEffect(() => {
    if (showName) {
      timeout.current && clearTimeout(timeout.current);
      setMountedPopup(showName);
    } else {
      timeout.current = setTimeout(() => {
        setMountedPopup(null);
      }, modalAnimationTimeOut);
    }
  }, [showName]);

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  const isOpen = useMemo(() => Boolean(showName), [showName]);

  return {
    mountedPopup,
    isOpen,
  };
}
