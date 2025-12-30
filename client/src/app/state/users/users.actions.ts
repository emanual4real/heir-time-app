import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@types';

export const CurrentUserActions = createActionGroup({
  source: 'Current User',
  events: {
    'User Login': props<{
      emailAddress: string;
      password: string;
    }>(),
    'User Login Success': props<{ user: User }>(),
    'User Login Failure': props<{ error: HttpErrorResponse }>(),
    'Get Current User': emptyProps(),
    'User Register': props<{ user: User }>(),
    'User Logout': emptyProps(),
  },
});

export const OtherUserActions = createActionGroup({
  source: 'Other Users',
  events: {
    'Get All Users': emptyProps(),
    'Get User By Email': props<{ emailAddress: string }>(),
  },
});
