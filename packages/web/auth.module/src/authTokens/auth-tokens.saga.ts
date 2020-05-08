import { selectUserId } from '@cupcake/profile.module';
import { authTokensActions, ActionTypes } from './auth-tokens.actions';
import { AxiosResponse } from 'axios';
import { getContext, call, put, takeLatest, select } from 'redux-saga/effects';
import { ApiService } from '@cupcake/common';

function* handleLogout() {
  try {
    console.log('saga start');
    const api: ApiService = yield getContext('api');
    const userId = yield select(selectUserId);
    const dto = { id: userId };
    const logoutResponse: AxiosResponse<any> = yield call(
      [api, 'post'],
      'auth/revoke_token',
      dto,
    );
    console.log(logoutResponse.data);
    yield put(authTokensActions.RemoveToken());
    console.log('saga end');
  } catch (e) {
    console.log('saga error');
  }
}

export default function* logoutSaga() {
  yield takeLatest(ActionTypes.LOGOUT, handleLogout);
}
