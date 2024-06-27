import { User } from '../../types';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

interface LoginAction {
  type: typeof LOGIN;
  payload: User;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type UserActionTypes = LoginAction | LogoutAction;

export const login = (user: User): UserActionTypes => ({
  type: LOGIN,
  payload: user,
});

export const logout = (): UserActionTypes => ({
  type: LOGOUT,
});
