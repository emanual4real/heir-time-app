import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItems from './items.reducer';

export const selectItemsState = createFeatureSelector<fromItems.State>(
  fromItems.itemsFeatureKey
);
