import { setServicesSearchTitleConst } from "../constants";

import {
  titleStateType,
  titleActionType,
} from "../../types";

export default function title(
  state: titleStateType = {},
  action: titleActionType
): titleStateType {
  switch (action.type) {
    case setServicesSearchTitleConst: {
      const { shouldFetch, servicesTitle } = action.payload;
      const {
         countryId, cityId,
        serviceId,
      } = servicesTitle;
      return {
        ...state,
        [serviceId]: {
          ...state?.[serviceId],
          [countryId]: {
            ...state?.[serviceId]?.[countryId],
            [cityId]: {
              shouldFetch,
              servicesTitle,
            },
          },
        },
      };
    }
    default:
      return state;
  }
}

// state = {
//   hotels?: {
//     this will contain currently active hotel's category
//   },
//   cars?: {
//     this will contain currently active cars's category
//   },
//   security?: {
//     this will contain currently active security's category
//   },
//   add-ons?: {
//     this will contain currently active add-ons's category
//   };
// }
