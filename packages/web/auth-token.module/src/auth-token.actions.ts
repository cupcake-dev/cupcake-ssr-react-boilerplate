import {
  createAction,
  ActionsUnion,
  AuthTokensInterface,
} from '@cupcake/common';

export const enum ActionTypes {
  SET_TOKEN = '[auth-token] Set token',
  REMOVE_TOKEN = '[auth-token] Remove token',
  GET_USER_EMAIL = '[auth-token] Get user email',
  SET_USER_EMAIL = '[auth-token] Set user email',
  HYDRATE = '__NEXT_REDUX_WRAPPER_HYDRATE__',
}

export const authTokenActions = {
  SetToken: (token: AuthTokensInterface) =>
    createAction(ActionTypes.SET_TOKEN, token),
  RemoveToken: () => createAction(ActionTypes.REMOVE_TOKEN),
  GetUserEmail: () => createAction(ActionTypes.GET_USER_EMAIL),
  SetUserEmail: (email: string) =>
    createAction(ActionTypes.SET_USER_EMAIL, email),
  Hydrate: (payload: any) => createAction(ActionTypes.HYDRATE, payload),
};

export type ActionsAll = ActionsUnion<typeof authTokenActions>;
