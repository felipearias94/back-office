import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, take } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CoursesFeatureStoreActions } from './courses-feature-store.actions';
import { Course, CoursePayload } from 'src/app/interfaces/Courses';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/core/services/notification.service';

@Injectable()
export class CoursesFeatureStoreEffects {
  loadCoursesFeatureStores$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesFeatureStoreActions.loadCourses),
      concatMap(() =>
        this.getAllCourses().pipe(
          map((data) =>
            CoursesFeatureStoreActions.loadCoursesSuccess({ data })
          ),
          catchError((error) =>
            of(CoursesFeatureStoreActions.loadCoursesFailure({ error }))
          )
        )
      )
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesFeatureStoreActions.createCourse),
      concatMap((action) =>
        this.createNewCourse(action.payload).pipe(
          map((data) =>
            CoursesFeatureStoreActions.createCourseSuccess({ payload: data })
          ),
          catchError((error) =>
            of(CoursesFeatureStoreActions.createCourseFailure({ error }))
          )
        )
      )
    );
  });

  editCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesFeatureStoreActions.editCourse),
      concatMap((action) =>
        this.editCourse(action.payload).pipe(
          map((data) =>
            CoursesFeatureStoreActions.createCourseSuccess({ payload: data })
          ),
          catchError((error) =>
            of(CoursesFeatureStoreActions.createCourseFailure({ error }))
          )
        )
      )
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesFeatureStoreActions.deleteCourse),
      concatMap((action) =>
        this.deleteCourse(action.courseId).pipe(
          map((data) =>
            CoursesFeatureStoreActions.deleteCourseSuccess({
              courseId: data.id,
            })
          ),
          catchError((error) =>
            of(CoursesFeatureStoreActions.deleteCourseFailure({ error }))
          )
        )
      )
    );
  });

  createCourseSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CoursesFeatureStoreActions.createCourseSuccess),
        map(() => this.store.dispatch(CoursesFeatureStoreActions.loadCourses()))
      );
    },
    { dispatch: false }
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private coursesService: CoursesService,
    private notificationService: NotificationService
  ) {}

  private getAllCourses(): Observable<Course[]> {
    this.coursesService.loadCourses();
    return this.coursesService.getCourses();
  }

  private createNewCourse(coursePayload: CoursePayload): Observable<Course> {
    return this.coursesService.createCourse(coursePayload);
  }

  private editCourse(updatedCourse: Course): Observable<Course> {
    return this.coursesService.editCourse(updatedCourse);
  }

  private deleteCourse(courseId: number): Observable<Course> {
    return this.coursesService.deleteCourse(courseId);
  }
}
