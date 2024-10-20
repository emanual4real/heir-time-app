import { createFeature, createReducer, on } from '@ngrx/store';
import { ProjectsActions } from './projects.actions';
import { Project } from '@types';

export const projectsFeatureKey = 'projects';

export interface ProjectState {
  projects: Project[];
  isLoading: boolean;
}

const initialState: ProjectState = {
  projects: [],
  isLoading: false,
};

const reducer = createReducer(
  initialState,
  // get projects
  on(ProjectsActions.getUserProjects, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(ProjectsActions.getUserProjectsSuccess, (state, action) => ({
    ...state,
    projects: action.projects,
    isLoading: false,
  })),
  on(ProjectsActions.getUserProjectsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  // create projects
  on(ProjectsActions.createUserProject, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(ProjectsActions.createUserProjectSuccess, (state, action) => {
    return {
      ...state,
      projects: [...state.projects, action.project],
      isLoading: false,
    };
  }),
  on(ProjectsActions.createUserProjectFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  // delete projects
  on(ProjectsActions.deleteUserProject, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(ProjectsActions.deleteUserProjectSuccess, (state, action) => {
    return {
      ...state,
      projects: state.projects.filter((row) => row.id !== action.projectId),
      isLoading: false,
    };
  }),
  on(ProjectsActions.deleteUserProjectFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  // reset projects
  on(ProjectsActions.resetProjects, () => initialState)
);

export const projectsFeature = createFeature({
  name: projectsFeatureKey,
  reducer,
});
