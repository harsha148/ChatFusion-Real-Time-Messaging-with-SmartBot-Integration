import { createStore, combineReducers } from 'redux';
import userReducer from './User/UserReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export default store;

