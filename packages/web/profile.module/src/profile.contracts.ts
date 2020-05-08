export interface ProfileAwareState {
  profile: ProfileState;
}

export type ProfileState = {
  email: string;
  userId: string;
};
