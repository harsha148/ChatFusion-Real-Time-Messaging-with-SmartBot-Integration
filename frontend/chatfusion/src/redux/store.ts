import { createStore, combineReducers } from 'redux';
import { loginReducer } from './Authentication/reducers';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './User/UserReducer';
import { chatReducer } from './Chat/ChatReducers';

// const rootReducer = combineReducers({
//   login:loginReducer,
//   user:userReducer,
//   chats:chatReducer
// });


const store = configureStore({
  reducer: {
    login:loginReducer,
    user:userReducer,
    chats:chatReducer,
  }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export default store;

