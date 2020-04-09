import { Action } from "redux";

export enum ActionTypes {
	CHANGE_LOGIN = "[auth/signIn] Change login",
	CHANGE_PASSWORD = "[auth/signIn] Change password",

	SIGN_IN = "[auth] Sign in",
	SIGN_IN_SUCCESS = "[auth] Sign in success",
	SIGN_IN_FAILURE = "[auth] Sign in failure",
}

export class ChangeLogin implements Action {
	readonly type = ActionTypes.CHANGE_LOGIN;
	constructor(public login: string) {}
}
export class ChangePassword implements Action {
	readonly type = ActionTypes.CHANGE_PASSWORD;
	constructor(public password: string) {}
}

export class SignIn implements Action {
	readonly type = ActionTypes.SIGN_IN;
	constructor() {}
}

export class SignInSuccess implements Action {
	readonly type = ActionTypes.SIGN_IN_SUCCESS;
	constructor() {}
}

export class SignInFailure implements Action {
	readonly type = ActionTypes.SIGN_IN_FAILURE;
	constructor() {}
}

export type ActionsAll =
	| SignIn
	| SignInSuccess
	| SignInFailure
	| ChangeLogin
	| ChangePassword;