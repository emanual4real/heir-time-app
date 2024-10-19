import { select, Store } from '@ngrx/store';
import { selectCurrentUser, selectLoggedIn } from './users.selectors';
import { Injectable } from '@angular/core';
import { CurrentUserActions } from './users.actions';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  currentUser$ = this.store.pipe(select(selectCurrentUser));
  isLoggedIn$ = this.store.pipe(select(selectLoggedIn));

  constructor(private store: Store) {}

  login(emailAddress: string, password: string) {
    this.store.dispatch(
      CurrentUserActions.userLogin({ payload: { emailAddress, password } })
    );
  }

  getCurrentUser() {
    this.store.dispatch(CurrentUserActions.getCurrentUser());
  }

  logout() {
    this.store.dispatch(CurrentUserActions.userLogout());
  }
}
