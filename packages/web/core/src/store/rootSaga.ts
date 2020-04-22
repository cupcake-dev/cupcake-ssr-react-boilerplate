import { GetUserEmailSaga } from '@cupcake/auth-token.module';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([GetUserEmailSaga()]);
}

export default rootSaga;
