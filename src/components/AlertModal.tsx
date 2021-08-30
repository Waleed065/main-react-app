import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { stateTypes } from "../types";

export default function AlertModal() {
  const {
    head,
    message,
    leftButtonText,
    rightButtonText,
    onLeftButtonPress,
    onRightButtonPress,
    showAlert,
  } = useSelector((state: stateTypes) => state.alertModal);

  return (
    <Dialog open={showAlert}>
      <DialogTitle>{head}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onLeftButtonPress} color="primary">
          {leftButtonText}
        </Button>
        <Button onClick={onRightButtonPress} color="primary" autoFocus>
          {rightButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
