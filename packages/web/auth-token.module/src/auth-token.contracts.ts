import { AuthTokensInterface } from '@cupcake/common';

export interface AuthTokenAwareState {
    authToken: AuthTokenState;
}

export type AuthTokenState = AuthTokensInterface | null;