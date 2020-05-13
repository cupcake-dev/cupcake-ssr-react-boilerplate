import Head from 'next/head';
import * as React from 'react';
import Header from '../header/Header';
import { useSelector } from 'react-redux';
import { authTokensSelectors } from '@cupcake/auth.module';

export interface LayoutProps {
  children?: any;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const isUserLoggedIn = useSelector(authTokensSelectors.selectAuthToken)
    ? true
    : false;

  return (
    <>
      <Head>
        <title>Cupcake development boilerplate</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header isUserLoggedIn={isUserLoggedIn} />
      {props.children}

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
};

export default Layout;
