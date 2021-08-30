import {
  addToCartConst,
  removeFromCartConst,
  updateCartConst,
  emptyCartConst,
} from "../constants";

import { cartStateType, cartActionType } from "../../types";

export default function isLoggedIn(
  state: cartStateType = {},
  action: cartActionType
): cartStateType {
  switch (action.type) {
    case addToCartConst: {
      const { countryId, cityId, serviceId, categoryId, _id } =
        action.payload;

      if (
        state?.[serviceId]?.[countryId]?.[cityId]?.[categoryId]?.some(
          (categoryobjectID) => categoryobjectID._id === _id
        )
      ) {
        return state;
      }
      return {
        ...state,
        [serviceId]: {
          ...state?.[serviceId],
          [countryId]: {
            ...state?.[serviceId]?.[countryId],
            [cityId]: {
              ...state?.[serviceId]?.[countryId]?.[cityId],
              [categoryId]: state?.[serviceId]?.[countryId]?.[cityId]?.[
                categoryId
              ]?.concat(action.payload) || [action.payload],
            },
          },
        },
      };
    }
    case removeFromCartConst: {
      const { countryId, cityId, serviceId, categoryId, _id } =
        action.payload;

      if (
        state?.[serviceId]?.[countryId]?.[cityId]?.[categoryId]?.some(
          (categoryobjectID) => categoryobjectID._id === _id
        )
      ) {
        state = {
          ...state,
          [serviceId]: {
            ...state?.[serviceId],
            [countryId]: {
              ...state?.[serviceId]?.[countryId],
              [cityId]: {
                ...state?.[serviceId]?.[countryId]?.[cityId],
                [categoryId]: state[serviceId]?.[countryId]?.[cityId]?.[
                  categoryId
                ]?.filter(
                  (categoryobjectID) => categoryobjectID._id !== _id
                ),
              },
            },
          },
        };

        if (state[serviceId][countryId][cityId][categoryId].length < 1) {
          delete state[serviceId][countryId][cityId][categoryId];

          if (!Object.keys(state[serviceId][countryId][cityId]).length) {
            delete state[serviceId][countryId][cityId];

            if (!Object.keys(state[serviceId][countryId]).length) {
              delete state[serviceId][countryId];

              if (!Object.keys(state[serviceId]).length) {
                delete state[serviceId];
              }
            }
          }
        }

        return state;
      } else {
        return state;
      }
    }
    case updateCartConst: {
      const { countryId, cityId, serviceId, categoryId, _id } =
        action.payload;

      return {
        ...state,
        [serviceId]: {
          ...state?.[serviceId],
          [countryId]: {
            ...state?.[serviceId]?.[countryId],
            [cityId]: {
              ...state?.[serviceId]?.[countryId]?.[cityId],
              [categoryId]: state[serviceId]?.[countryId]?.[cityId]?.[
                categoryId
              ]?.map((categoryobjectID) => {
                if (categoryobjectID._id === _id) {
                  return action.payload;
                } else return categoryobjectID;
              }),
            },
          },
        },
      };
    }
    case emptyCartConst:
      return {};

    default:
      return state;
  }
}

