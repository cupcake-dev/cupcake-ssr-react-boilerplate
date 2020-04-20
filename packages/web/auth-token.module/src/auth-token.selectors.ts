import { AuthTokenAwareState } from './auth-token.contracts';

export const selectAuthToken = (state: AuthTokenAwareState) =>
  state.authToken.token;
export const selectUserEmail = (state: AuthTokenAwareState) =>
  state.authToken.userEmail;
