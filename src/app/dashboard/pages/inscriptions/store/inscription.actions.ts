import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from 'src/app/interfaces/Courses';
import {
  Inscription,
  InscriptionPayload,
  InscriptionWithStudent,
} from 'src/app/interfaces/Inscriptions';
import { Student } from 'src/app/interfaces/Students';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: InscriptionWithStudent[] }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),

    'Load Courses Options': emptyProps(),
    'Load Courses Options Success': props<{ data: Course[] }>(),
    'Load Courses Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Students Options': emptyProps(),
    'Load Students Options Success': props<{ data: Student[] }>(),
    'Load Students Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Inscription': props<{ payload: InscriptionPayload }>(),
    'Create Inscription Success': props<{ data: Inscription }>(),
    'Create Inscription Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Inscription': props<{ inscriptionId: number }>(),
    'Delete Inscription Success': props<{
      inscriptionId: number | undefined;
    }>(),
    'Delete Inscription Failure': props<{ error: HttpErrorResponse }>(),
  },
});
