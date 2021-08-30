import { setDestinationConst } from "../constants";

import { destinationStateType, destinationActionType } from "../../types";

export default function destination(
  state: destinationStateType = {
    countryId: "",
    cityId: "",
  },
  action: destinationActionType
): destinationStateType {
  switch (action.type) {
    case setDestinationConst:
      return action.payload;
    default:
      return state;
  }
}
