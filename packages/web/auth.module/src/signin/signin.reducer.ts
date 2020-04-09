import { ActionsAll, ActionTypes } from "./signin.actions";
import { ISignInState, SignInStatusEnum } from "./../auth.contracts";

const initialState: ISignInState = {
	login: "",
	password: "",
	status: SignInStatusEnum.DRAFT,
};

export function signInReducer(
	state: ISignInState = initialState,
	action: ActionsAll
): ISignInState {
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
		case ActionTypes.CHANGE_LOGIN:
			return {
				...state,
				login: action.payload,
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
