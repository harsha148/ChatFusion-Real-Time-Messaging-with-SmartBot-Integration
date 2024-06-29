import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { LOGIN, LOGOUT, UserActionTypes } from './UserActions';
import { User } from '../../types';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case LOGIN:
      return { ...state,user: action.payload };
    case LOGOUT:
      return { ...state,user: null };
    default:
      return state;
  }
};

export default userReducer;
