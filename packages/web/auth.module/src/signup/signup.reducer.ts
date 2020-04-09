import { ISignUpState, SignUpStatusEnum } from "./../auth.contracts";
import { ActionsAll, ActionTypes } from "./signup.actions";

const initialState: ISignUpState = {
	login: "",
	email: "",
	password: "",
	passwordConfirm: "",
	status: SignUpStatusEnum.DRAFT,
};

export function signUpReducer(
	state: ISignUpState = initialState,
	action: ActionsAll
): ISignUpState {
	switch (action.type) {
		case ActionTypes.SIGN_UP:
			return {
				...state,
				status: SignUpStatusEnum.PENDING,
			};
		case ActionTypes.SIGN_UP_SUCCESS:
			return {
				...state,
				status: SignUpStatusEnum.SUCCESS,
			};
		case ActionTypes.SIGN_UP_FAILURE:
			return {
				...state,
				status: SignUpStatusEnum.FAIL,
			};
		case ActionTypes.CHANGE_LOGIN:
			return {
				...state,
				login: action.payload,
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
		case ActionTypes.CHANGE_PASSWORD_CONFIRM:
			return {
				...state,
				passwordConfirm: action.payload,
			};
		default:
			return state;
	}
}
