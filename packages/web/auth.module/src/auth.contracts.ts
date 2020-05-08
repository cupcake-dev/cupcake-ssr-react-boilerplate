import { AuthTokensInterface } from '@cupcake/common';

export interface AuthAwareState {
  signIn: SignInState;
  signUp: SignUpState;
  authTokens: AuthTokensState;
}
export interface SignUpState {
  email: string;
  password: string;
  passwordConfirm: string;
  status: SignUpStatusEnum;
}
export interface SignInState {
  email: string;
  password: string;
  status: SignInStatusEnum;
}
export interface AuthTokensState {
  token: AuthTokensInterface | null;
}

export enum SignInStatusEnum {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}
export enum SignUpStatusEnum {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}
