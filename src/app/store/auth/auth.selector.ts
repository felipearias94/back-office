import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector(authFeatureKey);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: any) => state.authUser
);
