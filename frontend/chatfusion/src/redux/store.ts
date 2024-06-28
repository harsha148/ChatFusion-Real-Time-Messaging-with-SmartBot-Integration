import { createStore, combineReducers } from 'redux';
import userReducer from './User/UserReducer';
import chatReducer from './Chat/ChatReducers';

const rootReducer = combineReducers({
  user: userReducer,
  chats:chatReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export default store;

