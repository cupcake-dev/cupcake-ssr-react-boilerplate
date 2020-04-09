export interface IAuthState {
	signIn: ISignInState;
	signUp: ISignUpState;
}
export interface ISignUpState {
    login: string;
    email: string;
    password: string;
    passwordConfirm: string;
    status: SignUpStatusEnum;
}
export interface ISignInState {
	login: string;
	password: string;
	status: SignInStatusEnum;
}

export enum SignInStatusEnum {
	DRAFT = "DRAFT",
	PENDING = "PENDING",
	SUCCESS = "SUCCESS",
	FAIL = "FAIL",
}
export enum SignUpStatusEnum {
	DRAFT = "DRAFT",
	PENDING = "PENDING",
	SUCCESS = "SUCCESS",
	FAIL = "FAIL",
}
