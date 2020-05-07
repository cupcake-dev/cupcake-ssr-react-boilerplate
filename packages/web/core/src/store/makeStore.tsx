import React from 'react';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import { createStore, IModuleStore } from 'redux-dynamic-modules';
import { getSagaExtension, ISagaModule } from 'redux-dynamic-modules-saga';
import { getAuthModule, authTokensActions } from '@cupcake/auth.module';
import { AppServicesContainer } from '@cupcake/common';
import axios from 'axios';

import { useStore } from 'react-redux';

export const makeStoreFactory: (modules: ISagaModule<any>[]) => MakeStore = (
  modules,
) => (context: Context) => {
  const appServicesContainer = new AppServicesContainer({
    API_URL: 'http://localhost:3000/api/', // TODO: need to get from env
  });
  const sagaExtension = getSagaExtension<AppServicesContainer>(
    appServicesContainer,
  );
  // @ts-ignore

  const store: IModuleStore<any> = createStore(
    {
      extensions: [sagaExtension],
    },
    getAuthModule(), // Module that stores JWT Token
    ...modules,
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
    if (context.req) {
      try {
        const tokens = await axios.post(
          'http://localhost:3000/api/auth/refresh_token',
        );
        console.log('tokens', tokens);
        store.dispatch({
          type: '[auth-token] Set token',
          payload: 'server token',
        });
      } catch (e) {
        console.log('tokens not getted', e);
      }
    }

    return PageComponent.getInitialProps
      ? await PageComponent.getInitialProps(context)
      : undefined;
  };
  return wrapper.withRedux(WithReduxDynamicModules);
}
