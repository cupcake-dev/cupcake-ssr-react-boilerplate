import React from 'react';
import App, { AppContext, AppInitialProps } from 'next/app';
import { END } from 'redux-saga';
import { SagaStore, withDefaultReduxModules } from '@cupcake/webcore';
import { parseCookies } from 'nookies';
import axios, { AxiosResponse } from 'axios';
import { AuthTokensInterface } from '@cupcake/common';
import { authTokenActions } from '@cupcake/auth-token.module';

// If we define our App like this it dispatches saga but hydrates state wrong
// const WrappedApp = (props: any) => {
//   const { Component, pageProps } = props;
//   return <Component {...pageProps} />;
// };

// If we make getServerSideProps it doesn't dispatch saga
// It works correct with getInitialProps
class WrappedApp extends App<AppInitialProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    };

    if (ctx.req) {
      // Run sagas
      console.log('Saga is executing on server, we will wait');
      ctx.store.dispatch(END);
      await (ctx.store as SagaStore).sagaTask.toPromise();
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default withDefaultReduxModules(WrappedApp);
