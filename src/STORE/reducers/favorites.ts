import { setFavoritesConst, removeFavoritesConst } from "../constants";

import {
  favoritesStateType,
  setFavoritesActionType,
  removeFavoritesActionType,
} from "../../types";

export default function favorites(
  state: favoritesStateType = [],
  action: any
): favoritesStateType {
  switch (action.type) {
    case setFavoritesConst:
      return action.payload as setFavoritesActionType["payload"];
    case removeFavoritesConst:
      return state.filter(
        (favourite) =>
          favourite._id !==
          (action.payload as removeFavoritesActionType["payload"])
      );
    default:
      return state;
  }
}
