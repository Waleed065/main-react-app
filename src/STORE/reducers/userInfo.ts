import {
  setUserInfoConst,
  removeUserInfoConst,
  updateUserInfoConst,
} from "../constants";

import {
  defaultUserInfo,
  updateUserInfoActionType,
  userInfoActionType,
  userInfoStateType,
} from "../../types";



export default function servicesSearchCategories(
  state: userInfoStateType = defaultUserInfo,
  action: any
): userInfoStateType {
  switch (action.type) {
    case setUserInfoConst:
      return {
        ...(action.payload as userInfoActionType["payload"]),
        isLoggedIn: true,
      };
    case updateUserInfoConst:
      return {
        ...state,
        ...(action.payload as updateUserInfoActionType["payload"]),
        isLoggedIn: true,
      };
    case removeUserInfoConst:
      return defaultUserInfo as userInfoStateType;
    default:
      return state;
  }
}
