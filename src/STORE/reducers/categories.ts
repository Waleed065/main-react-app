import { setCategoriesConst } from "../constants";

import {
  categoriesStateType,
  categoriesActionType,
} from "../../types";

export default function categories(
  state: categoriesStateType = {},
  action: categoriesActionType
): categoriesStateType {
  switch (action.type) {
    case setCategoriesConst: {
      const {
        countryId, cityId,
        serviceId,
        allCategories,
      } = action.payload;

      return {
        ...state,
        [serviceId]: {
          ...state?.[serviceId],
          [countryId]: {
            ...state?.[serviceId]?.[countryId],
            [cityId]: {
              shouldFetch: allCategories.shouldFetch,
              servicesCategories: {
                ...state?.[serviceId]?.[countryId]?.[cityId]?.servicesCategories,
                ...allCategories.servicesCategories,
              },
            },
          },
        },
      };
    }
    default:
      return state;
  }
}
