import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CurrentUserActions } from './users.actions';
import { UserService } from '@services';

@Injectable()
export class UsersEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrentUserActions.userLogin),
      switchMap((action) =>
        this.userService
          .login({
            emailAddress: action.emailAddress,
            password: action.password,
          })
          .pipe(
            map((user) => CurrentUserActions.userLoginSuccess({ user })),
            catchError((error) =>
              of(CurrentUserActions.userLoginFailure({ error }))
            )
          )
      )
    );
  });

  getCurrentUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrentUserActions.getCurrentUser),
      switchMap(() =>
        this.userService.getCurrentUser().pipe(
          map((user) => CurrentUserActions.userLoginSuccess({ user })),
          catchError((error) =>
            of(CurrentUserActions.userLoginFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
