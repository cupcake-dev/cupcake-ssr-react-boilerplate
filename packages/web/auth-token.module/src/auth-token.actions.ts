import {
	createAction,
	ActionsUnion,
	AuthTokensInterface
} from "@cupcake/common";

export const enum ActionTypes {
	SET_TOKEN = "[auth-token] Set token",
	REMOVE_TOKEN = "[auth-token] Remove token"
}

export const authTokenActions = {
	SetToken: (token: AuthTokensInterface) =>
		createAction(ActionTypes.SET_TOKEN, token),
	RemoveToken: () => createAction(ActionTypes.REMOVE_TOKEN)
};

export type ActionsAll = ActionsUnion<typeof authTokenActions>;
