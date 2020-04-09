import { Action } from "redux";

export enum ActionTypes {
	CHANGE_LOGIN = "[auth/signUp] Change login",
	CHANGE_EMAIL = "[auth/signUp] Change email",
	CHANGE_PASSWORD = "[auth/signUp] Change password",
	CHANGE_PASSWORD_CONFIRM = "[auth/signUp] Change password confirm",

	SIGN_UP = "[auth] Sign up",
	SIGN_UP_SUCCESS = "[auth] Sign up success",
	SIGN_UP_FAILURE = "[auth] Sign up failure",
}

export class ChangeLogin implements Action {
	readonly type = ActionTypes.CHANGE_LOGIN;
	constructor(public login: string) {}
}
export class ChangeEmail implements Action {
	readonly type = ActionTypes.CHANGE_EMAIL;
	constructor(public email: string) {}
}
export class ChangePassword implements Action {
	readonly type = ActionTypes.CHANGE_PASSWORD;
	constructor(public password: string) {}
}
export class ChangePasswordConfirm implements Action {
	readonly type = ActionTypes.CHANGE_PASSWORD_CONFIRM;
	constructor(public passwordConfirm: string) {}
}

export class SignUp implements Action {
	readonly type = ActionTypes.SIGN_UP;
	constructor() {}
}

export class SignUpSuccess implements Action {
	readonly type = ActionTypes.SIGN_UP_SUCCESS;
	constructor() {}
}

export class SignUpFailure implements Action {
	readonly type = ActionTypes.SIGN_UP_FAILURE;
	constructor() {}
}

export type ActionsAll =
	| SignUp
	| SignUpSuccess
	| SignUpFailure
	| ChangeLogin
	| ChangeEmail
	| ChangePassword
	| ChangePasswordConfirm;