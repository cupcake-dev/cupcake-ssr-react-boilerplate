import * as React from 'react';
import { PageContainer } from '../components/ui';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { authTokenActions } from '@cupcake/auth-token.module';
import { NextPage, GetServerSideProps } from 'next';
import {
  wrapper,
  withDefaultReduxModules,
  WithAuthTokens,
} from '@cupcake/webcore';
import { END } from 'redux-saga';
import { parseCookies } from 'nookies';
import axios, { AxiosResponse } from 'axios';
import { AuthTokensInterface } from '@cupcake/common';

const Title = styled('h1')`
  font-size: 56px;
`;
const Main = styled('main')`
  margin: 60px 0;
  text-align: center;
  font-size: 20px;
`;

export interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  return (
    <Layout>
      <PageContainer>
        <Main>
          <Title>Welcome to Cupcake Development boilerplate</Title>
          <p>
            Get started by editing this <code>pages/index.js</code>
          </p>

          <div>
            Here should be the info about the usage, motivation, examples etc.
          </div>
        </Main>
      </PageContainer>
    </Layout>
  );
};

// It doesn't refresh client store with store which was created on server
// It does it only at the initial loading
// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
//   async ({ store, req }: any) => {
//     store.dispatch(authTokenActions.GetUserEmail());

//     // handle Sagas
//     if (req) {
//       store.dispatch(END);
//       await store.sagaTask.toPromise();
//     }

//     return {
//       props: {},
//     };
//   },
// );

Home.getInitialProps = async ({ store, req }) => {
  // Try to refresh access token, and if sccessful dispatch it to store
  // const cookies = parseCookies(ctx);
  if (req) {
    const response: AxiosResponse<AuthTokensInterface> = await axios({
      method: 'post',
      baseURL: 'http://localhost:3000/api',
      url: 'auth/refresh_token',
      withCredentials: true,
      timeout: 5000,
      headers: { cookie: req.headers.cookie },
    });

    console.log(response.data.accessToken);
    if (response.data.accessToken) {
      store.dispatch(authTokenActions.SetToken(response.data));
    }
  }

  store.dispatch(authTokenActions.GetUserEmail());
  return {};
};

export default Home;
