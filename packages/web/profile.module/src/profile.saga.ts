import { profileActions, ActionTypes } from './profile.actions';
import { AxiosResponse } from 'axios';

import { getContext, call, put, takeLatest } from 'redux-saga/effects';
import { ApiService } from '@cupcake/common';

function* handleGetUserProfile() {
  try {
    console.log('saga start');
    const api: ApiService = yield getContext('api');
    const userDataResponse: AxiosResponse<any> = yield call(
      [api, 'get'],
      'auth/profile',
    );
    yield put(profileActions.SetUserProfile(userDataResponse.data));
    console.log('saga end');
  } catch (e) {
    console.log('saga error');
  }
}

export default function* GetUserProfileSaga() {
  yield takeLatest(ActionTypes.GET_USER_PROFILE, handleGetUserProfile);
}
