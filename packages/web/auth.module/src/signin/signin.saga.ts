import { SignInState } from './../auth.contracts';
import { signInActions, ActionTypes } from './signin.actions';
import { selectSignInState } from './signin.selectors';
import { put, select, getContext, call, takeLatest } from 'redux-saga/effects';
import { ApiService, AuthTokensInterface } from '@cupcake/common';
import { authTokenActions } from '@cupcake/auth-token.module';
import { AxiosResponse } from 'axios';

function* handleSignIn(action: ReturnType<typeof signInActions.SignIn>) {
  try {
    const api: ApiService = yield getContext('api');
    const signInState: SignInState = yield select(selectSignInState);
    const { email, password } = signInState;
    const dto = { email, password };
    const tokensResponse: AxiosResponse<AuthTokensInterface> = yield call(
      [api, 'post'],
      'auth/signIn',
      dto,
    );
    yield put(authTokenActions.SetToken(tokensResponse.data));
    yield put(signInActions.SignInSuccess());
  } catch (e) {
    yield put(signInActions.SignInFailure());
  }
}

export default function* signInSaga() {
  yield takeLatest(ActionTypes.SIGN_IN, handleSignIn);
}
