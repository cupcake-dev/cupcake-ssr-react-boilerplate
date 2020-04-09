import { Provider } from "react-redux";
import App, { AppContext } from "next/app";

import { withDefaultReduxModules } from "@cupcake/webcore";

class MyApp extends App<any> {
	static async getInitialProps({ Component, ctx }: AppContext) {
		const pageProps = Component.getInitialProps
			? await Component.getInitialProps(ctx)
			: {};

		return { pageProps };
	}

	render() {
		const { Component, pageProps, store } = this.props;
		return (
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		);
	}
}

export default withDefaultReduxModules(MyApp);