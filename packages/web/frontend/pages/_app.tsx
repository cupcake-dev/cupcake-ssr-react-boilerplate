import React from "react";
import App, { AppContext, AppInitialProps } from "next/app";
import { END } from "redux-saga";

import { withDefaultReduxModules, SagaStore } from "@cupcake/webcore";

class WrappedApp extends App<AppInitialProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    };

    if (ctx.req) {
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
