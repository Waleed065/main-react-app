import {
  setAffiliateInfoConst,
  setAffiliateIdConst,
  clearAffiliateInfoConst,
} from "../constants";

import {
  affiliateStateType,
  affiliateActionType,
  defaultAffiliateState,
} from "../../types";

export default function affiliate(
  state: affiliateStateType = defaultAffiliateState,
  action: any
): affiliateStateType {
  switch (action.type) {
    case setAffiliateInfoConst:
      return action.payload as affiliateActionType["payload"];
    case setAffiliateIdConst:
      return {
        ...state,
        _id: action.payload as string,
      };
    case clearAffiliateInfoConst:
      return defaultAffiliateState;
    default:
      return state;
  }
}
