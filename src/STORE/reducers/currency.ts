import { setCurrencyConst } from "../constants";

import { currencyStateType, currencyActionType } from "../../types";

const defaultState = {
  currencyCode: "EUR",
  exchangeRate: 1,
};
export default function servicesCategoryItems(
  state: currencyStateType = defaultState,
  action: currencyActionType
): currencyStateType {
  switch (action.type) {
    case setCurrencyConst:
      return action.payload;

    default:
      return state;
  }
}
