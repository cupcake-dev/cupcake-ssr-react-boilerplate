import {
  createAction,
  ActionsUnion,
  AuthTokensInterface,
} from '@cupcake/common';

export const enum ActionTypes {
  SET_TOKEN = '[auth-token] Set token',
  REMOVE_TOKEN = '[auth-token] Remove token',
  LOGOUT = '[auth-token] Logout',
  HYDRATE = '__NEXT_REDUX_WRAPPER_HYDRATE__',
}

export const authTokensActions = {
  SetToken: (token: AuthTokensInterface) =>
    createAction(ActionTypes.SET_TOKEN, token),
  RemoveToken: () => createAction(ActionTypes.REMOVE_TOKEN),
  Logout: () => createAction(ActionTypes.LOGOUT),
  Hydrate: (payload: any) => createAction(ActionTypes.HYDRATE, payload),
};

export type ActionsAll = ActionsUnion<typeof authTokensActions>;
