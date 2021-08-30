import { setPendingAdsConst } from "../constants";

import {
  pendingAdsStateType,
  pendingAdsActionType,
} from "../../types";

export default function servicesSearchCategories(
  state: pendingAdsStateType = [],
  action: pendingAdsActionType
): pendingAdsStateType {
  switch (action.type) {
    case setPendingAdsConst:
        return state.concat(action.payload)
    default:
      return state;
  }
}