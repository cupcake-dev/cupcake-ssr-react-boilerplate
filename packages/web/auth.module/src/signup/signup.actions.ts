import { createAction, ActionsUnion } from "@cupcake/common";

export const enum ActionTypes {
	CHANGE_LOGIN = "[auth/signUp] Change login",
	CHANGE_EMAIL = "[auth/signUp] Change email",
	CHANGE_PASSWORD = "[auth/signUp] Change password",
	CHANGE_PASSWORD_CONFIRM = "[auth/signUp] Change password confirm",

	SIGN_UP = "[auth] Sign up",
	SIGN_UP_SUCCESS = "[auth] Sign up success",
	SIGN_UP_FAILURE = "[auth] Sign up failure",
}

export const signUpActions = {
	ChangeLogin: (login: string) =>
		createAction(ActionTypes.CHANGE_LOGIN, login),
	ChangeEmail: (email: string) =>
		createAction(ActionTypes.CHANGE_EMAIL, email),
	ChangePassword: (password: string) =>
		createAction(ActionTypes.CHANGE_PASSWORD, password),
	ChangePasswordConfirm: (passwordConfirm: string) =>
		createAction(ActionTypes.CHANGE_PASSWORD_CONFIRM, passwordConfirm),
	SignUp: () => createAction(ActionTypes.SIGN_UP),
	SignUpSuccess: () => createAction(ActionTypes.SIGN_UP_SUCCESS),
	SignUpFailure: () => createAction(ActionTypes.SIGN_UP_FAILURE),
};

export type ActionsAll = ActionsUnion<typeof signUpActions>;