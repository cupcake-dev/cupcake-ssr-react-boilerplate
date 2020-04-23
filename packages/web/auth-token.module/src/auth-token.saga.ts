import { authTokenActions, ActionTypes } from './auth-token.actions';
import { AxiosResponse } from 'axios';

import { getContext, call, put, takeLatest } from 'redux-saga/effects';
import { ApiService } from '@cupcake/common';

function* handleGetUserEmail() {
  try {
    console.log('saga start');
    // Uncoment this when you want the real functionality
    const api: ApiService = yield getContext('api');
    const userDataResponse: AxiosResponse<any> = yield call(
      [api, 'get'],
      'auth/profile',
    );
    yield put(authTokenActions.SetUserEmail(userDataResponse.data.email));
    console.log('saga end');
  } catch (e) {
    console.log('saga error');
  }
}

export default function* GetUserEmailSaga() {
  yield takeLatest(ActionTypes.GET_USER_EMAIL, handleGetUserEmail);
}
