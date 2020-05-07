import { ProfileAwareState } from './profile.contracts';

export const selectUserEmail = (state: ProfileAwareState) =>
  state.profile.email;
export const selectUserId = (state: ProfileAwareState) => state.profile.userId;
