import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesFeatureStoreActions } from './courses-feature-store.actions';
import { Course } from 'src/app/interfaces/Courses';

export const coursesFeatureStoreFeatureKey = 'courses';

export interface State {
  courses: Course[];
  courseDetails: Course | null;
  error: unknown;
  loading: boolean;
}

export const initialState: State = {
  courses: [],
  courseDetails: null,
  error: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(CoursesFeatureStoreActions.loadCourses, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(CoursesFeatureStoreActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.data,
      loading: false,
    };
  }),

  on(CoursesFeatureStoreActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }),

  on(CoursesFeatureStoreActions.loadCourseDetails, (state, action) => {
    return {
      ...state,
      courseDetails:
        state.courses.find((c) => c.id === action.courseId) || null,
    };
  })
);

export const coursesFeatureStoreFeature = createFeature({
  name: coursesFeatureStoreFeatureKey,
  reducer,
});
