import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { InscriptionWithStudent } from 'src/app/interfaces/Inscriptions';
import { Student } from 'src/app/interfaces/Students';
import { Course } from 'src/app/interfaces/Courses';

export const inscriptionFeatureKey = 'inscription';

export interface State {
  data: InscriptionWithStudent[];
  studentsOptions: Student[];
  courseOptions: Course[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data: [],
  studentsOptions: [],
  courseOptions: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  // INSCRIPTIONS
  on(InscriptionActions.loadInscriptions, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false,
    };
  }),

  on(InscriptionActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }),

  // COURSES
  on(InscriptionActions.loadCoursesOptions, (state) => {
    return {
      ...state,
    };
  }),

  on(InscriptionActions.loadCoursesOptionsSuccess, (state, action) => {
    return {
      ...state,
      courseOptions: action.data,
    };
  }),

  on(InscriptionActions.loadCoursesOptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }),

  // STUDENTS
  on(InscriptionActions.loadStudentsOptions, (state) => {
    return {
      ...state,
    };
  }),

  on(InscriptionActions.loadStudentsOptionsSuccess, (state, action) => {
    return {
      ...state,
      studentsOptions: action.data,
    };
  }),

  on(InscriptionActions.loadStudentsOptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  })
);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});
