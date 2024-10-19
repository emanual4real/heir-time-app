import { createFeature, createReducer, on } from '@ngrx/store';
import { ItemsActions } from './items.actions';

const itemsFeatureKey = 'items';

interface ItemState {}

const initialState: ItemState = {};

const reducer = createReducer(
  initialState,
  on(ItemsActions.loadItemss, (state) => state)
);

export const itemsFeature = createFeature({
  name: itemsFeatureKey,
  reducer,
});
