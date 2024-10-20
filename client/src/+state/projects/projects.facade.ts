import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { selectCurrentUserProjects } from './projects.selectors';
import { ProjectsActions } from './projects.actions';
import { NewProjectPayload } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ProjectsFacade {
  projects$ = this.store.pipe(select(selectCurrentUserProjects));

  constructor(private store: Store) {}

  getCurrentUserProjects() {
    this.store.dispatch(ProjectsActions.getUserProjects());
  }

  createProject(project: NewProjectPayload) {
    this.store.dispatch(ProjectsActions.createUserProject({ project }));
  }

  deleteProject(projectId: string) {
    this.store.dispatch(ProjectsActions.deleteUserProject({ projectId }));
  }
}
