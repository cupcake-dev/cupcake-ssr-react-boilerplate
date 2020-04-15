import React from "react";
import withRedux, { MakeStore, MakeStoreOptions } from "next-redux-wrapper";
import {
	createStore,
	IModuleStore,
	DynamicModuleLoader
} from "redux-dynamic-modules";
import { getSagaExtension, ISagaModule } from "redux-dynamic-modules-saga";
import { getAuthTokenModule, selectAuthToken } from "@cupcake/auth-token.module";
import { AppServicesContainer } from "@cupcake/common";

export const makeStore: MakeStore = (
	initialState: any = {},
	options: MakeStoreOptions
) => {
	const appServicesContainer = new AppServicesContainer({
		API_URL: "localhost:8000" // TODO: need to get from env
	});
	const sagaExtension = getSagaExtension<AppServicesContainer>(
		appServicesContainer
	);

	const store: IModuleStore<any> = createStore(
		{
			initialState: initialState,
			extensions: [sagaExtension]
		},
		getAuthTokenModule() // Module that stores JWT Token
		/*put default modules here*/
	);

	appServicesContainer.api.setGetAuthTokensHandler(() => {
		return selectAuthToken(store.getState());
	});

	return store;
};

export function withReduxDynamicModules(
	PageComponent: any,
	modules: ISagaModule<any>[]
) {
	const WithReduxDynamicModules = (props: any) => {
		return (
			<DynamicModuleLoader modules={modules}>
				<PageComponent {...props} />
			</DynamicModuleLoader>
		);
	};
	return WithReduxDynamicModules;
}

export function withDefaultReduxModules(MyApp: any) {
	return withRedux(makeStore)(MyApp);
}
