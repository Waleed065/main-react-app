import { setOurServicesUrlValidConst } from "../constants";

import { booleanActionType } from "../../types";

export default function servicesSearchCategories(
  state: boolean = true,
  action: booleanActionType
): boolean {
  switch (action.type) {
    case setOurServicesUrlValidConst:
      return action.payload;
    default:
      return state;
  }
}
