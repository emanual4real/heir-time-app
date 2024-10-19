import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { map, tap } from 'rxjs';
import { UsersFacade } from '@state';

export const autoLoginResolver: ResolveFn<boolean> = () => {
  const userFacade = inject(UsersFacade);

  const currentUser$ = userFacade.currentUser$;

  return currentUser$.pipe(
    tap((data) => {
      if (data === null) {
        userFacade.getCurrentUser();
      }
    }),
    map(() => true)
  );
};
