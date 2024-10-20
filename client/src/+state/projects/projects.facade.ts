import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  selectCurrentProject,
  selectCurrentUserProjects,
} from './projects.selectors';
import { ProjectsActions } from './projects.actions';
import { NewProjectPayload } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ProjectsFacade {
  projects$ = this.store.pipe(select(selectCurrentUserProjects));

  currentProject$ = this.store.pipe(select(selectCurrentProject));

  constructor(private store: Store) {}

  getCurrentUserProjects() {
    this.store.dispatch(ProjectsActions.getUserProjects());
  }

  setCurrentProject(projectId: string) {
    this.store.dispatch(ProjectsActions.selectProject({ projectId }));
  }

  createProject(project: NewProjectPayload) {
    this.store.dispatch(ProjectsActions.createUserProject({ project }));
  }

  deleteProject(projectId: string) {
    this.store.dispatch(ProjectsActions.deleteUserProject({ projectId }));
  }
}
