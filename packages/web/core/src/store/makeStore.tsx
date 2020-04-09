import React from "react";
import withRedux, { MakeStore, MakeStoreOptions } from "next-redux-wrapper";
import {
	createStore,
	IModuleStore,
	DynamicModuleLoader,
} from "redux-dynamic-modules";
import { getSagaExtension, ISagaModule } from "redux-dynamic-modules-saga";

export const makeStore: MakeStore = (
	initialState: any = {},
	options: MakeStoreOptions
) => {
	const store: IModuleStore<any> = createStore({
		initialState: initialState,
		extensions: [
			getSagaExtension({} /* saga context */),
		],
		/*put default modules here*/
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
