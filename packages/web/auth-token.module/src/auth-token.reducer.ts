import { AuthTokenState } from "./auth-token.contracts";
import { ActionsAll, ActionTypes } from "./auth-token.actions";

const initialState: AuthTokenState = null;

export function authTokenReducer(
	state: AuthTokenState = initialState,
	action: ActionsAll
): AuthTokenState {
	switch (action.type) {
		case ActionTypes.SET_TOKEN:
			return action.payload;
		case ActionTypes.REMOVE_TOKEN:
			return null;
		default:
			return state;
	}
}
