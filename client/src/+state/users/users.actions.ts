import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@types';

export const CurrentUserActions = createActionGroup({
  source: 'Current User',
  events: {
    'User Login': props<{
      payload: {
        emailAddress: string;
        password: string;
      };
    }>(),
    'User Login Success': props<{ res: User }>(),
    'User Login Failure': props<{ res: HttpErrorResponse }>(),
    'Get Current User': emptyProps(),
    'User Register': props<{ payload: User }>(),
    'User Logout': emptyProps(),
  },
});

export const OtherUserActions = createActionGroup({
  source: 'Other Users',
  events: {
    'Get All Users': emptyProps(),
    'Get User By Email': props<{ payload: { emailAddress: string } }>(),
  },
});
