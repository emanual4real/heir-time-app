import { createFeatureSelector, createSelector } from '@ngrx/store';
import { usersFeatureKey, UserState } from './users.reducer';

export const selectUsersState =
  createFeatureSelector<UserState>(usersFeatureKey);

export const selectCurrentUser = createSelector(selectUsersState, (state) => {
  return state.currentUser;
});

export const selectLoggedIn = createSelector(selectUsersState, (state) => {
  return state.loggedIn;
});

export const selectUserList = createSelector(selectUsersState, (state) => {
  return state.userList;
});

export const selectError = createSelector(selectUsersState, (state) => {
  return state.error;
});
