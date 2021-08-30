import { setAllCategoriesConst } from "../constants";

import { allCategoriesActionType, allCategoriesStateType } from "../../types";

export default function servicesSearchCategories(
  state: allCategoriesStateType = {},
  action: allCategoriesActionType
): allCategoriesStateType {
  switch (action.type) {
    case setAllCategoriesConst: {
      const { serviceId, allCategories } = action.payload;

      return {
        ...state,
        [serviceId]: state?.[serviceId]?.concat(allCategories) ?? allCategories,
      };
    }
    default:
      return state;
  }
}
