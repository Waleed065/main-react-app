import { chatRoomsActionType, chatRoomsStateType } from "../../types";
import { chatRoomConst } from "../constants";



export default function chatRooms(
  state: chatRoomsStateType = {},
  action: chatRoomsActionType
): chatRoomsStateType {
  switch (action.type) {
    case chatRoomConst: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
