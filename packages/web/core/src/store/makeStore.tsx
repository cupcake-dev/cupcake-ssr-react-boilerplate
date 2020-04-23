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
  authTokenActions,
} from '@cupcake/auth-token.module';
import { AppServicesContainer } from '@cupcake/common';
import axios, { AxiosResponse } from 'axios';
import { AuthTokensInterface } from '@cupcake/common';
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

// export function WithAuthTokens(PageComponent: any) {
//   const WithAuthTokens = (props: any) => {
//     return <PageComponent {...props} />;
//   };

//   if (PageComponent.getInitialProps) {
//     WithAuthTokens.getInitalProps = async ({ PageComponent, ctx }: any) => {
//       if (ctx.req) {
//         // Try to refresh access token, and if sccessful dispatch it to store
//         // const cookies = parseCookies(ctx);
//         const response: AxiosResponse<AuthTokensInterface> = await axios({
//           method: 'post',
//           baseURL: 'http://localhost:3000/api',
//           url: 'auth/refresh_token',
//           withCredentials: true,
//           timeout: 5000,
//           headers: { cookie: ctx.req.headers.cookie },
//         });

//         console.log(response.data.accessToken);
//         if (response.data.accessToken) {
//           ctx.store.dispatch(authTokenActions.SetToken(response.data));
//         }
//       }

//       return await PageComponent.getInitialProps(ctx);
//     };
//   }

//   return WithAuthTokens;
// }

export function withDefaultReduxModules(MyApp: any) {
  return wrapper.withRedux(MyApp);
}

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
