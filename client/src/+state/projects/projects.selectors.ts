import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProjects from './projects.reducer';

export const selectProjectsState = createFeatureSelector<fromProjects.State>(
  fromProjects.projectsFeatureKey
);
