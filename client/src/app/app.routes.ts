import { Route } from '@angular/router';
import { HomeComponent, ProjectsComponent } from '@components';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'projects',
        component: ProjectsComponent,
      },
    ],
  },
];
