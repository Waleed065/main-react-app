import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";

import Fab from "@material-ui/core/Fab";
import clsx from "clsx";
import { AiOutlineCheck } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { messageSchema } from "../../types";
import { useDispatch } from "react-redux";
import { fetchChatMessages } from "../../STORE/actions";

interface schema {
  firstMessage: messageSchema;
}
export default function CircularIntegration({
  firstMessage: { chatRoomId, _id },
}: schema) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const timer = useRef<any>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [success]);

  const setLoadingFalse = () => {
    setLoading(false);
    setSuccess(true);
  };

  const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);
      setSuccess(false);

      dispatch(
        fetchChatMessages({
          chatRoomId,
          chatId: _id,
          Then: setLoadingFalse,
          Catch: setLoadingFalse,
          InvalidRequest: setLoadingFalse,
        })
      );
    }
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.default]: true,
  });
  return (
    <div className={classes.root}>
      <Fab
        aria-label="save"
        color="primary"
        size={"small"}
        className={buttonClassname}
        onClick={handleButtonClick}
      >
        <>
          {!success ? (
            <FiMoreHorizontal size={20} />
          ) : (
            <AiOutlineCheck size={20} />
          )}
          {loading && (
            <CircularProgress size={45} className={classes.fabProgress} />
          )}
        </>
      </Fab>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    margin: 5,
  },
  default: {
    color: "white",
  },

  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -2,
    left: -2,
    zIndex: 1,
  },
});
