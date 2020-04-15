import { AuthTokenAwareState } from "./auth-token.contracts";

export const selectAuthToken = (state: AuthTokenAwareState) => state.authToken;
