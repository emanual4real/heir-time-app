import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Project } from '@types';

export const ProjectsActions = createActionGroup({
  source: 'Projects',
  events: {
    'Get User Projects': emptyProps(),
    'Get User Projects Success': props<{ projects: Project[] }>(),
    'Get User Projects Failure': props<{ error: HttpErrorResponse }>(),

    'Create User Project': props<{ project: Project }>(),
    'Create User Project Success': props<{ project: Project }>(),
    'Create User Project Failure': props<{ error: HttpErrorResponse }>(),

    'Delete User Project': props<{ projectId: string }>(),
    'Delete User Project Success': props<{ projectId: string }>(),
    'Delete User Project Failure': props<{ error: HttpErrorResponse }>(),

    'Reset Projects': emptyProps(),
  },
});
