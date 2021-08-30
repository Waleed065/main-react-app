import { setOrdersConst } from "../constants";

import { ordersStateType, ordersActionType } from "../../types";

export default function favourityIds(
  state: ordersStateType = [],
  action: ordersActionType
): ordersStateType {
  switch (action.type) {
    case setOrdersConst:
      // return state.concat(action.payload);
      return action.payload;
    default:
      return state;
  }
}
