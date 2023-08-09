import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interfaces/User';
import { AuthActions } from './auth.action';

export const authFeatureKey = 'auth';
export interface AuthState {
  authUser: User | null;
}
const initialState: AuthState = {
  authUser: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setAuthUser, (currentState, action) => {
    return {
      authUser: action.payload,
    };
  })
);
