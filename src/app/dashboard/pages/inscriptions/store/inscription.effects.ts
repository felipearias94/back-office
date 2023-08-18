import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { HttpClient } from '@angular/common/http';
import {
  Inscription,
  InscriptionPayload,
  InscriptionWithStudent,
} from 'src/app/interfaces/Inscriptions';
import { environment } from 'src/environments/environment.prod';
import { CoursesService } from 'src/app/core/services/courses.service';
import { StudentsService } from 'src/app/core/services/students.service';
import { Course } from 'src/app/interfaces/Courses';
import { Student } from 'src/app/interfaces/Students';
import { Store } from '@ngrx/store';

@Injectable()
export class InscriptionEffects {
  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadInscriptions),
      concatMap(() =>
        this.getInscriptionsFromDB().pipe(
          map((data) => InscriptionActions.loadInscriptionsSuccess({ data })),
          catchError((error) =>
            of(InscriptionActions.loadInscriptionsFailure({ error }))
          )
        )
      )
    );
  });

  loadStudentsOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadInscriptions),
      concatMap(() =>
        this.getStudentsOptions().pipe(
          map((data) =>
            InscriptionActions.loadStudentsOptionsSuccess({ data })
          ),
          catchError((error) =>
            of(InscriptionActions.loadStudentsOptionsFailure({ error }))
          )
        )
      )
    );
  });

  loadCoursesOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadInscriptions),
      concatMap(() =>
        this.getCoursesOptions().pipe(
          map((data) => InscriptionActions.loadCoursesOptionsSuccess({ data })),
          catchError((error) =>
            of(InscriptionActions.loadCoursesOptionsFailure({ error }))
          )
        )
      )
    );
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.createInscription),
      concatMap((action) =>
        this.createInscription(action.payload).pipe(
          map((data) => InscriptionActions.createInscriptionSuccess({ data })),
          catchError((error) =>
            of(InscriptionActions.createInscriptionFailure({ error }))
          )
        )
      )
    );
  });

  createSaleSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(InscriptionActions.createInscriptionSuccess),
        map(() => this.store.dispatch(InscriptionActions.loadInscriptions()))
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store
  ) {}

  apiUrl = environment.baseApiUrl + 'inscriptions';

  private getInscriptionsFromDB(): Observable<InscriptionWithStudent[]> {
    return this.httpClient.get<InscriptionWithStudent[]>(
      this.apiUrl + '?_expand=course'
    );
  }

  private getCoursesOptions(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(environment.baseApiUrl + 'courses/');
  }

  private getStudentsOptions(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(environment.baseApiUrl + 'students/');
  }

  private createInscription(payload: InscriptionPayload) {
    return this.httpClient.post<Inscription>(this.apiUrl, payload);
  }
}
