import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { selectCurrentUserProjects } from './projects.selectors';
import { ProjectsActions } from './projects.actions';

@Injectable({
  providedIn: 'root',
})
export class ProjectsFacade {
  projects$ = this.store.pipe(select(selectCurrentUserProjects));

  constructor(private store: Store) {}

  getCurrentUserProjects() {
    this.store.dispatch(ProjectsActions.getUserProjects());
  }
}
