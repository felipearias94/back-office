import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCoursesFeatureStore from './courses-feature-store.reducer';

export const selectCoursesState =
  createFeatureSelector<fromCoursesFeatureStore.State>(
    fromCoursesFeatureStore.coursesFeatureStoreFeatureKey
  );

export const selectCoursesArray = createSelector(
  selectCoursesState,
  (state) => state.courses
);

export const selectCourseById = createSelector(
  selectCoursesState,
  (state) => state.courseDetails
);
