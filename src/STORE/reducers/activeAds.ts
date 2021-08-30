import { setActiveAdsConst } from "../constants";

import {
  activeAdsStateType,
  activeAdsActionType,
} from "../../types";

export default function servicesSearchCategories(
  state: activeAdsStateType = [],
  action: activeAdsActionType
): activeAdsStateType {
  switch (action.type) {
    case setActiveAdsConst:
        return state.concat(action.payload)
    default:
      return state;
  }
}