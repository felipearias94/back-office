import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { HttpClient } from '@angular/common/http';
import { InscriptionWithStudent } from 'src/app/interfaces/Inscriptions';
import { environment } from 'src/environments/environment.prod';

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

  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  apiUrl = environment.baseApiUrl + 'inscriptions';

  private getInscriptionsFromDB(): Observable<InscriptionWithStudent[]> {
    return this.httpClient.get<InscriptionWithStudent[]>(
      this.apiUrl + '?_expand=course'
    )
  }
}
