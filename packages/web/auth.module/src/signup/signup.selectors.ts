import { IAuthState } from "./../auth.contracts";

export const selectSignUpStatus = (state: IAuthState) => state.signUp.status;
export const selectLogin = (state: IAuthState) => state.signUp.login;
export const selectEmail = (state: IAuthState) => state.signUp.email;
export const selectPassword = (state: IAuthState) => state.signUp.password;
export const selectPasswordConfirm = (state: IAuthState) =>
	state.signUp.passwordConfirm;
