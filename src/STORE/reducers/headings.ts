import { setServicesHeadingsConst } from "../constants";

import {
  headingsStateType,
  headingsActionType,
} from "../../types";

export default function servicesHeadings(
  state: headingsStateType = {},
  action: headingsActionType
): headingsStateType {
  switch (action.type) {
    case setServicesHeadingsConst: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
}
