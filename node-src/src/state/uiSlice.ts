import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { heirTimeApi } from '@ui/services';

export interface UiState {
  currentProject?: string;
}

const initialState: UiState = {};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<string>) => {
      return { ...state, currentProject: action.payload };
    }
  }
});

// actions
export const { setCurrentProject } = uiSlice.actions;

// State selectors
const selectUserData = heirTimeApi.endpoints.getSelf.select();

// selectors
export const selectCurrentProject = (state: RootState) => state.ui.currentProject ?? '';

export const selectIsProjectOwner = createSelector(
  selectUserData,
  selectCurrentProject,
  (userData, currentProject) => userData.data?.ownedProjects?.includes(currentProject ?? '')
);

export default uiSlice.reducer;
