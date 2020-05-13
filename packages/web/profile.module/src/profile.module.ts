import { ISagaModule } from 'redux-dynamic-modules-saga';
import { ProfileAwareState } from './profile.contracts';
import { profileReducer } from './profile.reducer';
import GetUserProfileSaga from './profile.saga';

export function getProfileModule(): ISagaModule<ProfileAwareState> {
  return {
    id: 'profile',
    reducerMap: {
      profile: profileReducer,
    },
    // Actions to fire when this module is added/removed
    sagas: [GetUserProfileSaga],
  };
}
