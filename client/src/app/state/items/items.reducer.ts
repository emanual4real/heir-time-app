import { createFeature, createReducer, on } from '@ngrx/store';
import { ItemsActions } from './items.actions';

export const itemsFeatureKey = 'items';

export type ItemState = object;

const initialState: ItemState = {};

const reducer = createReducer(
  initialState,
  on(ItemsActions.loadItemss, (state) => state)
);

export const itemsFeature = createFeature({
  name: itemsFeatureKey,
  reducer,
});
