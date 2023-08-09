import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/User';

export const AuthActions = createActionGroup({
  source: 'auth',
  events: {
    setAuthUser: props<{ payload: User | null }>(),
  },
});
