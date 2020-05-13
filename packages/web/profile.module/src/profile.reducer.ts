import { ProfileState } from './profile.contracts';
import { ActionsAll, ActionTypes } from './profile.actions';

const initialState: ProfileState = {
  email: '',
  userId: '',
};

export function profileReducer(
  state: ProfileState = initialState,
  action: ActionsAll,
): ProfileState {
  switch (action.type) {
    case ActionTypes.HYDRATE:
      if (!action.payload) {
        return state;
      }
      return { ...state, ...action.payload.profile };
    case ActionTypes.SET_USER_PROFILE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
