import { Route } from '@angular/router';
import { HomeComponent, ProjectHomeComponent } from '@components';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { autoLoginResolver } from '@resolvers';
import {
  ItemsEffects,
  itemsFeature,
  ProjectsEffects,
  projectsFeature,
  UsersEffects,
  usersFeature,
} from 'src/+state';
import { projectResolver } from 'src/resolvers/project';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    resolve: [autoLoginResolver, projectResolver],
    providers: [
      provideState(itemsFeature),
      provideState(projectsFeature),
      provideState(usersFeature),
      provideEffects([ItemsEffects, ProjectsEffects, UsersEffects]),
    ],
    children: [
      {
        path: 'projects',
        component: ProjectHomeComponent,
      },
    ],
  },
];
