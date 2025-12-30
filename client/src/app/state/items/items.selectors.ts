import { createFeatureSelector } from '@ngrx/store';
import * as fromItems from './items.reducer';
import { ItemState } from './items.reducer';

export const selectItemsState = createFeatureSelector<ItemState>(fromItems.itemsFeatureKey);
