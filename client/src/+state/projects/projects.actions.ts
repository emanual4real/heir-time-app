import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProjectsActions = createActionGroup({
  source: 'Projects',
  events: {
    'Load Projectss': emptyProps(),
    
    
  }
});
