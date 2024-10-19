import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '@services';
import { map, tap } from 'rxjs';

export const autoLoginResolver: ResolveFn<boolean> = (route, state) => {
  const userService = inject(UserService);

  const user$ = userService.user;

  return user$.pipe(
    tap((data) => {
      if (data === null) {
        userService.getMe();
      }
    }),
    map(() => true),
  );
};
