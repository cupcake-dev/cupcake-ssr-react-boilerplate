export interface AuthAwareState {
  signIn: SignInState;
  signUp: SignUpState;
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
