import { setAlertConst, clearAlertConst } from "../constants";
import { alertStateType, alertActionType } from "../../types";

const defaultState = {
  head: "Alert",
  message: "",
  leftButtonText: "Cancel",
  rightButtonText: "Ok",
  onLeftButtonPress: () => null,
  onRightButtonPress: () => null,
  showAlert: false,
};

export default function alertModal(
  state: alertStateType = defaultState,
  action: alertActionType
): alertStateType {
  switch (action.type) {
    case setAlertConst:
      return {
        ...action.payload,
        showAlert: true,
      };
    case clearAlertConst:
      return {
        ...state,
        showAlert: false,
      };

    default:
      return defaultState;
  }
}
