import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProjectsFacade, UsersFacade } from '@state';
import { map, tap } from 'rxjs';

export const projectResolver: ResolveFn<boolean> = () => {
  const userFacade = inject(UsersFacade);
  const projectFacade = inject(ProjectsFacade);

  const user$ = userFacade.currentUser$;

  return user$.pipe(
    // filter((user) => user !== null),
    tap((user) => {
      console.log('user', user);
      if (user !== null) {
        projectFacade.getCurrentUserProjects();
      }
    }),
    map(() => true)
  );
};
