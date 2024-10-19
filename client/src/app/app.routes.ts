import { Route } from '@angular/router';
import { HomeComponent, ProjectHomeComponent } from '@components';
import { autoLoginResolver } from '@resolvers';
import { projectResolver } from 'src/resolvers/project';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    resolve: [autoLoginResolver, projectResolver],
    children: [
      {
        path: 'projects',
        component: ProjectHomeComponent,
      },
    ],
  },
];
