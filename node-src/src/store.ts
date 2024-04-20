import { configureStore } from '@reduxjs/toolkit';
import { heirTimeApi } from './services/api';
import { uiSlice } from './state';

const devMode = import.meta.env.MODE === 'dev';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    [heirTimeApi.reducerPath]: heirTimeApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(heirTimeApi.middleware),
  devTools: devMode
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
