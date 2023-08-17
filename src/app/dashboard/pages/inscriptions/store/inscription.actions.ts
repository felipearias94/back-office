import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { InscriptionWithStudent } from 'src/app/interfaces/Inscriptions';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: InscriptionWithStudent[] }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),
  },
});
