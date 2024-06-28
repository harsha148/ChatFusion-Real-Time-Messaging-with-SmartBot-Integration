import { Chat } from '../../types';
import { ADD_CHAT, ADD_MESSAGE, ChatActionTypes } from './ChatActions';

const initialState: Chat[] = [
    {
        id:1,
        name:'User3',
        messages:[
            {
                id:1,
                text:'Hi!',
                sender:'User1',
                timestamp:'2mins ago'
            },
            {
                id:2,
                text:'Hey!',
                sender:'User3',
                timestamp:'2mins ago'
            }
            ,
            {
                id:3,
                text:'How are you doing!',
                sender:'User1',
                timestamp:'2mins ago'
            },
            {
                id:4,
                text:'I am good! How about you',
                sender:'User2',
                timestamp:'2mins ago'
            }
        ]
    },
    {
        id:2,
        name:'User2',
        messages:[
            {
                id:1,
                text:'Heyyaaa',
                sender:'User2',
                timestamp:'5mins ago'
            }
        ]
    }
];

const chatReducer = (state = initialState, action: ChatActionTypes): Chat[] => {
  switch (action.type) {
    case ADD_CHAT:
      return [...state, action.payload];
    case ADD_MESSAGE:
      return state.map((chat) =>
        chat.id === action.payload.chatId
          ? { ...chat, messages: [...chat.messages, action.payload.message] }
          : chat
      );
    default:
      return state;
  }
};

export default chatReducer;
