import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course, CoursePayload } from 'src/app/interfaces/Courses';

export const CoursesFeatureStoreActions = createActionGroup({
  source: 'CoursesFeatureStore',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: Course[] }>(),
    'Load Courses Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course Details': props<{ courseId: number | undefined }>(),

    'Create Course': props<{ payload: CoursePayload }>(),
    'Create Course Success': props<{ payload: Course }>(),
    'Create Course Failure': props<{ error: HttpErrorResponse }>(),

    'Edit Course': props<{ payload: Course }>(),
    'Edit Course Success': props<{ payload: Course }>(),
    'Edit Course Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Course': props<{ courseId: number }>(),
    'Delete Course Success': props<{ courseId: number | undefined }>(),
    'Delete Course Failure': props<{ error: HttpErrorResponse }>(),
  },
});
