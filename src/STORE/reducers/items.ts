import {
  setItemsConst,
  addToItemsConst,
} from "../constants";

import {
  itemsStateType,
  itemsActionType,
  addOnToItemsActionType,
} from "../../types";

export default function servicesCategoryItems(
  state: itemsStateType = {},
  action: any
): itemsStateType {
  switch (action.type) {
    case setItemsConst: {
      const {
        countryId, cityId,
        serviceId,
        categoryId,
        categoryItems,
        filterBy,
        sortBy,
        shouldFetch,
      }: itemsActionType["payload"] = action.payload;

      return {
        ...state,
        [serviceId]: {
          ...state?.[serviceId],
          [countryId]: {
            ...state?.[serviceId]?.[countryId],
            [cityId]: {
              ...state?.[serviceId]?.[countryId]?.[cityId],
              [categoryId]: {
                shouldFetch,
                filterBy,
                sortBy,
                servicesItems: categoryItems,
              },
            },
          },
        },
      };
    }
    case addToItemsConst: {
      const {
        countryId, cityId,
        serviceId,
        categoryId,
        categoryItems,
      }: addOnToItemsActionType["payload"] = action.payload;

      return {
        ...state,
        [serviceId]: {
          ...state?.[serviceId],
          [countryId]: {
            ...state?.[serviceId]?.[countryId],
            [cityId]: {
              ...state?.[serviceId]?.[countryId]?.[cityId],
              [categoryId]: {
                shouldFetch:
                  state?.[serviceId]?.[countryId]?.[cityId]?.[categoryId]?.shouldFetch ??
                  true,
                filterBy:
                  state?.[serviceId]?.[countryId]?.[cityId]?.[categoryId]?.filterBy ?? null,
                sortBy:
                  state?.[serviceId]?.[countryId]?.[cityId]?.[categoryId]?.sortBy ?? null,
                servicesItems:
                  state?.[serviceId]?.[countryId]?.[cityId]?.[
                    categoryId
                  ]?.servicesItems?.concat(categoryItems) ?? categoryItems,
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
