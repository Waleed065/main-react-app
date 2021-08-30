import { setAddOnsConst } from "../constants";

import { addOnsStateType, addOnsActionType } from "../../types";

export default function servicesSearchCategories(
  state: addOnsStateType = {},
  action: addOnsActionType
): addOnsStateType {
  switch (action.type) {
    case setAddOnsConst:
      return action.payload;
    default:
      return state;
  }
}
