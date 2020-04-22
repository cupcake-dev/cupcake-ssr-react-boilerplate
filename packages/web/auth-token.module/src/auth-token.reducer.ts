import { AuthTokenState } from './auth-token.contracts';
import { ActionsAll, ActionTypes } from './auth-token.actions';

const initialState: AuthTokenState = {
  token: null,
  userEmail: '',
};

export function authTokenReducer(
  state: AuthTokenState = initialState,
  action: ActionsAll,
): AuthTokenState {
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
      return { token: null, userEmail: '' };
    case ActionTypes.SET_USER_EMAIL:
      return { ...state, userEmail: action.payload };
    default:
      return state;
  }
}
