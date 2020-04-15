import { AuthAwareState } from "./../auth.contracts";

export const selectSignUpState = (state: AuthAwareState) => state.signUp;
export const selectSignUpStatus = (state: AuthAwareState) => state.signUp.status;
export const selectEmail = (state: AuthAwareState) => state.signUp.email;
export const selectPassword = (state: AuthAwareState) => state.signUp.password;
export const selectPasswordConfirm = (state: AuthAwareState) =>
	state.signUp.passwordConfirm;
