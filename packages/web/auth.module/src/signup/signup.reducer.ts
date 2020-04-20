import { SignUpState, SignUpStatusEnum } from "./../auth.contracts";
import { ActionsAll, ActionTypes } from "./signup.actions";

const initialState: SignUpState = {
	email: "",
	password: "",
	passwordConfirm: "",
	status: SignUpStatusEnum.DRAFT,
};

export function signUpReducer(
	state: SignUpState = initialState,
	action: ActionsAll
): SignUpState {
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
