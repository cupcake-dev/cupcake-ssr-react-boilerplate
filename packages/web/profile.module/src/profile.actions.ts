import { createAction, ActionsUnion } from '@cupcake/common';

export const enum ActionTypes {
  GET_USER_PROFILE = '[profile] Get user profile',
  SET_USER_PROFILE = '[profile] Set user profile',
  HYDRATE = '__NEXT_REDUX_WRAPPER_HYDRATE__',
}

export const profileActions = {
  GetUserProfile: () => createAction(ActionTypes.GET_USER_PROFILE),
  SetUserProfile: (profile: { email: string; userId: string }) =>
    createAction(ActionTypes.SET_USER_PROFILE, profile),
  Hydrate: (payload: any) => createAction(ActionTypes.HYDRATE, payload),
};

export type ActionsAll = ActionsUnion<typeof profileActions>;
