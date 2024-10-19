import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { ProjectsActions } from './projects.actions';

@Injectable()
export class ProjectsEffects {


  loadProjectss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ProjectsActions.loadProjectss),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  constructor(private actions$: Actions) {}
}
