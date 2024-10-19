import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ItemsActions = createActionGroup({
  source: 'Items',
  events: {
    'Load Itemss': emptyProps(),
    
    
  }
});
