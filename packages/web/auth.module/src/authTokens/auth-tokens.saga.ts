import { selectUserId, profileActions } from '@cupcake/profile.module';
import { authTokensActions, ActionTypes } from './auth-tokens.actions';
import { AxiosResponse } from 'axios';
import { getContext, call, put, takeLatest, select } from 'redux-saga/effects';
import { ApiService } from '@cupcake/common';

function* handleLogout() {
  try {
    const api: ApiService = yield getContext('api');
    const userId = yield select(selectUserId);
    const dto = { id: userId };
    const logoutResponse: AxiosResponse<any> = yield call(
      [api, 'post'],
      'auth/revoke_token',
      dto,
    );
    yield put(authTokensActions.RemoveToken());
    yield put(profileActions.SetUserProfile({ email: '', userId: '' }));
  } catch (e) {
    console.log('Logout error');
  }
}

export default function* logoutSaga() {
  yield takeLatest(ActionTypes.LOGOUT, handleLogout);
}
