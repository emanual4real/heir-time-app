import { createFeature, createReducer, on } from '@ngrx/store';
import { ProjectsActions } from './projects.actions';

const projectsFeatureKey = 'projects';

interface ProjectState {}

const initialState: ProjectState = {};

const reducer = createReducer(
  initialState,
  on(ProjectsActions.loadProjectss, (state) => state)
);

export const projectsFeature = createFeature({
  name: projectsFeatureKey,
  reducer,
});
