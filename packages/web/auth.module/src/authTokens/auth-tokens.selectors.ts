import { AuthAwareState } from '../auth.contracts';

export const selectAuthToken = (state: AuthAwareState) =>
  state.authTokens.token;
