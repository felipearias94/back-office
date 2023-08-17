import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from './auth.reducer';
import { Role } from 'src/app/interfaces/User';

export const selectAuthState = createFeatureSelector(authFeatureKey);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: any) => state.authUser
);

export const selectAuthUserRole = createSelector(
  selectAuthUser,
  (state) => state.authUser?.role
);

export const selectIsAdmin = createSelector(
  selectAuthUser,
  (state) => state.role === Role.admin
);
