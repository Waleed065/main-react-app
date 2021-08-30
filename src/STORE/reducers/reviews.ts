import { commentsItemType } from "../../types";
import { setReviewsConst } from "../constants";

export default function servicesSearchCategories(
  state: commentsItemType[] = [],
  action: {
    type: string;
    payload: commentsItemType[];
  }
): commentsItemType[] {
  switch (action.type) {
    case setReviewsConst:
      return action.payload;
    default:
      return state;
  }
}
