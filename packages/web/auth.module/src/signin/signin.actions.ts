import { createAction, ActionsUnion } from "@cupcake/common";

export const enum ActionTypes {
	CHANGE_EMAIL = "[auth/signIn] Change email",
	CHANGE_PASSWORD = "[auth/signIn] Change password",

	SIGN_IN = "[auth] Sign in",
	SIGN_IN_SUCCESS = "[auth] Sign in success",
	SIGN_IN_FAILURE = "[auth] Sign in failure",
}

export const signInActions = {
	ChangeEmail: (email: string) =>
		createAction(ActionTypes.CHANGE_EMAIL, email),
	ChangePassword: (password: string) =>
		createAction(ActionTypes.CHANGE_PASSWORD, password),
	SignIn: () => createAction(ActionTypes.SIGN_IN),
	SignInSuccess: () => createAction(ActionTypes.SIGN_IN_SUCCESS),
	SignInFailure: () => createAction(ActionTypes.SIGN_IN_FAILURE),
};

export type ActionsAll = ActionsUnion<typeof signInActions>;