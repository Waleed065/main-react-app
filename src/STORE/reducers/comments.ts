import { setCommentsConst } from "../constants";

import { commentsStateType, commentsActionType } from "../../types";

export default function servicesCategoryItems(
  state: commentsStateType = {},
  action: commentsActionType
): commentsStateType {
  switch (action.type) {
    case setCommentsConst:
      const { _id, comments } = action.payload;

      return {
        ...state,
        [_id]: state[_id]?.concat(comments) ?? comments,
      };
    default:
      return state;
  }
}
