import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProjectsActions } from './projects.actions';
import { ProjectService } from '@services';
import { CurrentUserActions } from '../users/users.actions';

@Injectable()
export class ProjectsEffects {
  getUserProjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.getUserProjects),
      switchMap(() =>
        this.projectService.getUserProject().pipe(
          map((projects) =>
            ProjectsActions.getUserProjectsSuccess({ projects })
          ),
          catchError((error) =>
            of(ProjectsActions.getUserProjectsFailure({ error }))
          )
        )
      )
    );
  });

  getProjectsAfterLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrentUserActions.userLoginSuccess),
      switchMap(() => of(ProjectsActions.getUserProjects()))
    );
  });

  clearProjectsAfterLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrentUserActions.userLogout),
      switchMap(() => of(true).pipe(map(() => ProjectsActions.resetProjects())))
    );
  });

  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}
}
