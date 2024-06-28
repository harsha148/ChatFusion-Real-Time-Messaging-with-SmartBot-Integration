import { Chat, MessageType } from '../../types';

export const ADD_CHAT = 'ADD_CHAT';
export const ADD_MESSAGE = 'ADD_MESSAGE';

interface AddChatAction {
  type: typeof ADD_CHAT;
  payload: Chat;
}

interface AddMessageAction {
  type: typeof ADD_MESSAGE;
  payload: { chatId: number; message: MessageType };
}

export type ChatActionTypes = AddChatAction | AddMessageAction;

export const addChat = (chat: Chat): ChatActionTypes => ({
  type: ADD_CHAT,
  payload: chat,
});

export const addMessage = (chatId: number, message: MessageType): ChatActionTypes => ({
  type: ADD_MESSAGE,
  payload: { chatId, message },
});
