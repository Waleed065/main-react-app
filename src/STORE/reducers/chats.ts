import {
  initialMessagesActionType,
  chatsStateType,
  messageSchema,
  previousMessagesActionType,
} from "../../types";
import { messageConst, setInitialMessagesConst, addPreviousMessagesConst } from "../constants";

export default function chats(
  state: chatsStateType = {},
  action: any
): chatsStateType {
  switch (action.type) {
    case setInitialMessagesConst: {
      return {
        ...state,
        ...action.payload as initialMessagesActionType['payload']
      };
    }
    case addPreviousMessagesConst: {
      const {chatRoomId, messages}=  action.payload as previousMessagesActionType['payload']
      return {
        ...state,
        [chatRoomId]: messages.concat(state[chatRoomId] ?? [])
      };
    }
    case messageConst: {
      const { chatRoomId } = action.payload as messageSchema;
      return {
        ...state,
        [chatRoomId]: state?.[chatRoomId]?.concat(action.payload) ?? [
          action.payload,
        ],
      };
    }

    default:
      return state;
  }
}
