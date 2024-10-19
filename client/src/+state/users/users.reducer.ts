import { createFeature, createReducer, on } from '@ngrx/store';
import { CurrentUserActions, OtherUserActions } from './users.actions';
import { User } from '@types';
import { HttpErrorResponse } from '@angular/common/http';

export const usersFeatureKey = 'users';

export interface UserState {
  currentUser: User | null;
  loggedIn: boolean;
  userList: User[];
  error: HttpErrorResponse | null;
}

const initialState: UserState = {
  currentUser: null,
  loggedIn: false,
  userList: [],
  error: null,
};

const reducer = createReducer(
  initialState,
  // current user
  on(CurrentUserActions.getCurrentUser, (state) => ({
    ...state,
    currentUser: null,
    loggedIn: false,
    error: null,
  })),
  on(CurrentUserActions.userLogin, (state) => ({
    ...state,
    currentUser: null,
    loggedIn: false,
    error: null,
  })),
  on(CurrentUserActions.userLoginSuccess, (state, action) => ({
    ...state,
    currentUser: action.res,
    loggedIn: true,
  })),
  on(CurrentUserActions.userLoginFailure, (state, action) => ({
    ...state,
    loggedIn: false,
    error: action.res,
  })),
  on(CurrentUserActions.userRegister, (state) => state),
  on(CurrentUserActions.userLogout, () => initialState),
  // other users
  on(OtherUserActions.getAllUsers, (state) => state),
  on(OtherUserActions.getUserByEmail, (state) => state)
);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
});
