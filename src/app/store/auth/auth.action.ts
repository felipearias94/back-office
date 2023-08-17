import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/User';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'set auth user': props<{ payload: User | null }>(),
  },
});
