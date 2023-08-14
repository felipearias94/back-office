import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesFeatureStoreActions } from './courses-feature-store.actions';
import { Course } from 'src/app/interfaces/Courses';

const mock_courses: Course[] = [
  {
    id: 1,
    courseName: 'Sarasa',
    teacher: 'Yo',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 2,
    courseName: 'Sarasa',
    teacher: 'Yo',
    startDate: new Date(),
    endDate: new Date(),
  },
];

export const coursesFeatureStoreFeatureKey = 'courses';

export interface State {
  courses: Course[];
  courseDetails: Course | null;
}

export const initialState: State = {
  courses: [],
  courseDetails: null,
};

export const reducer = createReducer(
  initialState,
  on(CoursesFeatureStoreActions.loadCourses, (state) => {
    return {
      courses: mock_courses,
      courseDetails: state.courseDetails,
    };
  }),

  on(CoursesFeatureStoreActions.loadCategoryDetails, (state, action) => {
    return {
      ...state,
      courseDetails: mock_courses.find((c) => c.id === action.courseId) || null,
    };
  })
);

export const coursesFeatureStoreFeature = createFeature({
  name: coursesFeatureStoreFeatureKey,
  reducer,
});
