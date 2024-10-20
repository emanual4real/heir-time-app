import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Item, NewProjectPayload, Project } from '@types';

export const ProjectsActions = createActionGroup({
  source: 'Projects',
  events: {
    'Get User Projects': emptyProps(),
    'Get User Projects Success': props<{ projects: Project[] }>(),
    'Get User Projects Failure': props<{ error: HttpErrorResponse }>(),

    'Create User Project': props<{ project: NewProjectPayload }>(),
    'Create User Project Success': props<{ project: Project }>(),
    'Create User Project Failure': props<{ error: HttpErrorResponse }>(),

    'Update User Project': props<{ project: Project }>(),
    'Update User Project Success': props<{ project: Project }>(),
    'Update User Project Failure': props<{ error: HttpErrorResponse }>(),

    'Delete User Project': props<{ projectId: string }>(),
    'Delete User Project Success': props<{ projectId: string }>(),
    'Delete User Project Failure': props<{ error: HttpErrorResponse }>(),

    'Reset Projects': emptyProps(),
    'Select Project': props<{ projectId: string }>(),
  },
});

export const ItemsActions = createActionGroup({
  source: 'Items',
  events: {
    'Create Item': props<{ item: Item; projectId: string }>(),
    'Create Item Success': props<{ item: Item }>(),
    'Create Item Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Item': props<{ itemId: string }>(),
    'Delete Item Success': props<{ itemId: string }>(),
    'Delete Item Failure': props<{ error: HttpErrorResponse }>(),
  },
});
