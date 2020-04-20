import { AuthAwareState } from './auth.contracts';
import { signInReducer } from './signin/signin.reducer';
import { signUpReducer } from './signup/signup.reducer';
import { ISagaModule } from 'redux-dynamic-modules-saga';
import signInSaga from './signin/signin.saga';
import signUpSaga from './signup/signup.saga';

export function getAuthModule(): ISagaModule<AuthAwareState> {
  return {
    id: 'auth',
    reducerMap: {
      signIn: signInReducer,
      signUp: signUpReducer,
    },
    // Actions to fire when this module is added/removed
    sagas: [signInSaga, signUpSaga],
  };
}
