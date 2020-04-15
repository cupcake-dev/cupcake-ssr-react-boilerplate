import { AxiosResponse } from "axios";
import { authTokenActions } from "@cupcake/auth-token.module";
import { selectSignUpState } from "./signup.selectors";
import { SignUpState } from "./../auth.contracts";
import { getContext, select, call, put, takeLatest } from "redux-saga/effects";
import { ApiService, AuthTokensInterface } from "@cupcake/common";
import { signUpActions, ActionTypes } from "./signup.actions";

function* handleSignUp(action: ReturnType<typeof signUpActions.SignUp>) {
	try {
		const api: ApiService = yield getContext("api");
		const signUpState: SignUpState = yield select(selectSignUpState);
		const { email, password } = signUpState;
		const dto = { email, password };
		const tokensResponse: AxiosResponse<AuthTokensInterface> = yield call(
			[api, "post"],
			"auth/signUp",
			dto
		);
		yield put(authTokenActions.SetToken(tokensResponse.data));
		yield put(signUpActions.SignUpSuccess());
	} catch (e) {
		yield put(signUpActions.SignUpFailure());
	}
}

export default function* signUpSaga() {
	yield takeLatest(ActionTypes.SIGN_UP, handleSignUp);
}
