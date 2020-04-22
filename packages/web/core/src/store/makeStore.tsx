import React from 'react';
import { Store } from 'redux';
import { Task } from 'redux-saga';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import {
  createStore,
  IModuleStore,
  DynamicModuleLoader,
} from 'redux-dynamic-modules';
import { getSagaExtension, ISagaModule } from 'redux-dynamic-modules-saga';
import {
  getAuthTokenModule,
  selectAuthToken,
} from '@cupcake/auth-token.module';
import { AppServicesContainer } from '@cupcake/common';
import rootSaga from './rootSaga';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

export const makeStore: MakeStore = (context: Context) => {
  const appServicesContainer = new AppServicesContainer({
    API_URL: 'http://localhost:3000/api/', // TODO: need to get from env
  });
  const sagaExtension = getSagaExtension<AppServicesContainer>(
    appServicesContainer,
  );

  const store: IModuleStore<any> = createStore(
    {
      extensions: [sagaExtension],
    },
    getAuthTokenModule(), // Module that stores JWT Token
    /*put default modules here*/
  );

  (store as SagaStore).sagaTask = sagaExtension.middleware![0].run(rootSaga);

  appServicesContainer.api.setGetAuthTokensHandler(() => {
    return selectAuthToken(store.getState());
  });

  return store;
};
export const wrapper = createWrapper(makeStore, { debug: true });

export function withReduxDynamicModules(
  PageComponent: any,
  modules: ISagaModule<any>[],
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
  return wrapper.withRedux(MyApp);
}
