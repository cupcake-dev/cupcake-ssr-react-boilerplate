import { ActionsAll, ActionTypes } from "./signin.actions";
import { SignInState, SignInStatusEnum } from "./../auth.contracts";

const initialState: SignInState = {
	email: "",
	password: "",
	status: SignInStatusEnum.DRAFT,
};

export function signInReducer(
	state: SignInState = initialState,
	action: ActionsAll
): SignInState {
	switch (action.type) {
		case ActionTypes.SIGN_IN:
			return {
				...state,
				status: SignInStatusEnum.PENDING,
			};
		case ActionTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				status: SignInStatusEnum.SUCCESS,
			};
		case ActionTypes.SIGN_IN_FAILURE:
			return {
				...state,
				status: SignInStatusEnum.FAIL,
			};
		case ActionTypes.CHANGE_EMAIL:
			return {
				...state,
				email: action.payload,
			};
		case ActionTypes.CHANGE_PASSWORD:
			return {
				...state,
				password: action.payload,
			};
		default:
			return state;
	}
}
