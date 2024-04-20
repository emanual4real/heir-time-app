import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

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

// selectors
export const selectCurrentProject = (state: RootState) => state.ui.currentProject;

export default uiSlice.reducer;
