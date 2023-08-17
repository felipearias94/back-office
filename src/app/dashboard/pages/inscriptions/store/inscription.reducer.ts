import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { InscriptionWithStudent } from 'src/app/interfaces/Inscriptions';

export const inscriptionFeatureKey = 'inscription';

export interface State {
  data: InscriptionWithStudent[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(InscriptionActions.loadInscriptions, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false,
    };
  }),

  on(InscriptionActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  })
);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});
