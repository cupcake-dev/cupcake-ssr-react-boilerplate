import React from 'react';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import { createStore, IModuleStore } from 'redux-dynamic-modules';
import { getSagaExtension, ISagaModule } from 'redux-dynamic-modules-saga';
import {
  getAuthModule,
  authTokensActions,
  AuthAwareState,
} from '@cupcake/auth.module';
import { END } from 'redux-saga';
import { AppServicesContainer, AuthTokensInterface } from '@cupcake/common';
import axios from 'axios';

import { useStore } from 'react-redux';

export const makeStoreFactory: (modules: ISagaModule<any>[]) => MakeStore = (
  modules,
) => (context: Context) => {
  const appServicesContainer = new AppServicesContainer({
    API_URL:
      typeof window === 'undefined'
        ? 'http://localhost:8000'
        : 'http://localhost:3000/api/',
  });
  const sagaExtension = getSagaExtension<AppServicesContainer>(
    appServicesContainer,
  );

  const store: IModuleStore<any> = createStore(
    {
      extensions: [sagaExtension],
    },
    getAuthModule(), // Module that stores JWT Token
    ...modules,
  );

  // @ts-ignore
  store.sagaTasks = sagaExtension.tasks;

  appServicesContainer.setStore(store);
  appServicesContainer.api.setGetAuthTokensHandler(() => {
    return (store.getState() as AuthAwareState).authTokens.token;
  });
  appServicesContainer.api.setDispatchSetTokenAction(
    (token: AuthTokensInterface) => {
      store.dispatch(authTokensActions.SetToken(token));
    },
  );

  return store;
};

export function withReduxDynamicModules(
  PageComponent: any,
  modules: ISagaModule<any>[],
) {
  const wrapper = createWrapper(makeStoreFactory(modules), { debug: true });

  const WithReduxDynamicModules = (props: any) => {
    const store: IModuleStore<any> = useStore() as IModuleStore<any>;
    store.addModules(modules);
    return <PageComponent {...props} />;
  };

  WithReduxDynamicModules.getInitialProps = async (context: any) => {
    const { store } = context;
    store.addModules(modules);
    const { req } = context;
    if (req) {
      try {
        const cookie = req.headers.cookie;
        const tokens = await axios({
          method: 'post',
          url: 'http://localhost:8000/auth/refresh_token',
          headers: { cookie },
        });
        if (tokens.data.accessToken !== '') {
          store.dispatch(authTokensActions.SetToken(tokens.data));
        } else {
          store.dispatch(authTokensActions.RemoveToken());
        }
      } catch (e) {
        store.dispatch(authTokensActions.RemoveToken());
      }
    }
    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(context);
    }

    // Stop saga on the server
    if (req) {
      store.dispatch(END);
      const { sagaTasks } = store;
      await Promise.all(
        sagaTasks.keys.map((key: any) => sagaTasks.get(key).toPromise()),
      );
    }
    return pageProps;
  };
  return wrapper.withRedux(WithReduxDynamicModules);
}
