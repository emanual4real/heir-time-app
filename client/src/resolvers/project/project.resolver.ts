import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProjectService } from '@services';
import { UsersFacade } from '@state';
import { map, tap } from 'rxjs';

export const projectResolver: ResolveFn<boolean> = () => {
  const userFacade = inject(UsersFacade);
  const projectService = inject(ProjectService);

  const user$ = userFacade.currentUser$;

  return user$.pipe(
    // filter((user) => user !== null),
    tap((user) => {
      if (user !== null) {
        projectService.getUserProject();
      }
    }),
    map(() => true)
  );
};
