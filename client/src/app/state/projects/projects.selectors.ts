import { createFeatureSelector, createSelector } from '@ngrx/store';
import { projectsFeatureKey, ProjectState } from './projects.reducer';

export const selectProjectsState =
  createFeatureSelector<ProjectState>(projectsFeatureKey);

export const selectCurrentUserProjects = createSelector(
  selectProjectsState,
  (state) => {
    return state.projects;
  }
);

export const selectCurrentProject = createSelector(
  selectProjectsState,
  (state) => {
    return state.currentProject;
  }
);

export const selectProjectsLoading = createSelector(
  selectProjectsState,
  (state) => {
    return state.isLoading;
  }
);
