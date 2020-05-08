import { AuthTokensState } from '../auth.contracts';
import { ActionsAll, ActionTypes } from './auth-tokens.actions';

const initialState: AuthTokensState = {
  token: null,
};

export function authTokensReducer(
  state: AuthTokensState = initialState,
  action: ActionsAll,
): AuthTokensState {
  switch (action.type) {
    case ActionTypes.HYDRATE:
      console.log(action);
      if (!action.payload) {
        return state;
      }
      return { ...state, ...action.payload.authToken };
    case ActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    case ActionTypes.REMOVE_TOKEN:
      return { token: null };
    default:
      return state;
  }
}
