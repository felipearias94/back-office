import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { HttpClient } from '@angular/common/http';
import { InscriptionWithStudent } from 'src/app/interfaces/Inscriptions';
import { environment } from 'src/environments/environment.prod';
import { CoursesService } from 'src/app/core/services/courses.service';
import { StudentsService } from 'src/app/core/services/students.service';
import { Course } from 'src/app/interfaces/Courses';
import { Student } from 'src/app/interfaces/Students';

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

  constructor(private actions$: Actions, private httpClient: HttpClient) {}

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
}
