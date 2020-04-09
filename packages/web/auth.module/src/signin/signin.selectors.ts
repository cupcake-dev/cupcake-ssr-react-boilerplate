import { IAuthState } from "./../auth.contracts";

export const selectSignInStatus = (state: IAuthState) => state.signIn.status;
export const selectLogin = (state: IAuthState) => state.signIn.login;
export const selectPassword = (state: IAuthState) => state.signIn.password;
