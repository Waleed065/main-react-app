import React from "react";
import { Snackbar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { stateTypes } from "../types";
import { clearSnackBar } from "../STORE/actions";
import {MdClear} from "react-icons/md";


export default function Snack() {
  const snackBarMsg = useSelector((state: stateTypes) => state.snackBar);
  const dispatch = useDispatch();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={Boolean(snackBarMsg.length)}
      action={<MdClear onClick={() => dispatch(clearSnackBar())} />}
      onClose={() => dispatch(clearSnackBar())}
      message={snackBarMsg}
      autoHideDuration={5000}
      // key={snackBarMsg}
    />
  );
}
