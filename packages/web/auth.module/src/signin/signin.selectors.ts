import { AuthAwareState } from './../auth.contracts';

export const selectSignInState = (state: AuthAwareState) => state.signIn;
export const selectSignInStatus = (state: AuthAwareState) =>
  state.signIn.status;
export const selectEmail = (state: AuthAwareState) => state.signIn.email;
export const selectPassword = (state: AuthAwareState) => state.signIn.password;
