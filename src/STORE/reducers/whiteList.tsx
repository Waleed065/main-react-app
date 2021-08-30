import { setWhiteListDestinationsConst } from "../constants";

import {
  whiteListStateType,
  whiteListDestinationsActionType,
} from "../../types";

export default function whiteListCities(
  state: whiteListStateType = {},
  action: any
): whiteListStateType {
  switch (action.type) {
    case setWhiteListDestinationsConst: {
      const {
        serviceId,
        destinations
      }: whiteListDestinationsActionType["payload"] = action.payload;
      return {
        ...state,
        [serviceId]: destinations,
      };
    }
    default:
      return state;
  }
}
