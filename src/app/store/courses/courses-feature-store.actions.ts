import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CoursesFeatureStoreActions = createActionGroup({
  source: 'CoursesFeatureStore',
  events: {
    'Load Courses': emptyProps(),
    'Load Category Details': props<{ courseId: number }>(),
  },
});
