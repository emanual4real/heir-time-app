import { Route } from '@angular/router';
import { HomeComponent, ItemHomeComponent, ProjectHomeComponent } from '@components';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ProjectsEffects, projectsFeature, UsersEffects, usersFeature } from '@state';

export const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    resolve: [],
    providers: [
      provideState(projectsFeature),
      provideState(usersFeature),
      provideEffects([ProjectsEffects, UsersEffects]),
    ],
    children: [
      {
        path: 'projects',
        component: ProjectHomeComponent,
      },
      {
        path: 'items',
        component: ItemHomeComponent,
      },
    ],
  },
];
