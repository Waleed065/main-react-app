import { setServicesLoadingConst } from "../constants";

import { booleanActionType } from "../../types";

export default function servicesLoading(
  state: boolean = false,
  action: booleanActionType
): boolean {
  switch (action.type) {
    case setServicesLoadingConst:
      return action.payload;
    default:
      return state;
  }
}
