import { createFeature, createReducer, on } from '@ngrx/store';
import { ProjectsActions } from './projects.actions';
import { Project } from '@types';

export const projectsFeatureKey = 'projects';

export interface ProjectState {
  projects: Project[];
  projectsLoading: boolean;
}

const initialState: ProjectState = {
  projects: [],
  projectsLoading: false,
};

const reducer = createReducer(
  initialState,
  on(ProjectsActions.getUserProjects, (state) => ({
    ...state,
    projectsLoading: true,
  })),
  on(ProjectsActions.getUserProjectsSuccess, (state, action) => ({
    ...state,
    projects: action.projects,
    projectsLoading: false,
  })),
  on(ProjectsActions.getUserProjectsFailure, (state, action) => ({
    ...state,
    projectsLoading: false,
    error: action.error,
  })),
  on(ProjectsActions.resetProjects, () => initialState)
);

export const projectsFeature = createFeature({
  name: projectsFeatureKey,
  reducer,
});
