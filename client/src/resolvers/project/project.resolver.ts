import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProjectService, UserService } from '@services';
import { filter, map, tap } from 'rxjs';

export const projectResolver: ResolveFn<boolean> = (route, state) => {
  const userService = inject(UserService);
  const projectService = inject(ProjectService);

  const user$ = userService.user;

  return user$.pipe(
    // filter((user) => user !== null),
    tap((user) => {
      if (user !== null) {
        projectService.getUserProject();
      }
    }),
    map(() => true),
  );
};
