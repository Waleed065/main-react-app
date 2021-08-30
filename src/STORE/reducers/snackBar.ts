import { stringActionType } from "../../types";
import { setSnackBarConst, clearSnackBarConst } from "../constants";

export default function servicesSearchCategories(
  state: string = '',
  action: stringActionType
): string {
  switch (action.type) {
    case setSnackBarConst:
      return action.payload;
    case clearSnackBarConst:
      return '';
    default:
      return state;
  }
}
