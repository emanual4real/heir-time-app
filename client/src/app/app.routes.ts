import { Route } from '@angular/router';
import { HomeComponent, ProjectHomeComponent } from '@components';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { autoLoginResolver } from '@resolvers';
import {
  ProjectsEffects,
  projectsFeature,
  UsersEffects,
  usersFeature,
} from 'src/+state';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    resolve: [autoLoginResolver],
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
    ],
  },
];
