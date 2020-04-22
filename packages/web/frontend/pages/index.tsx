import * as React from 'react';
import { PageContainer } from '../components/ui';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { authTokenActions } from '@cupcake/auth-token.module';
import { NextPage, GetServerSideProps } from 'next';
import { wrapper, withDefaultReduxModules } from '@cupcake/webcore';
import { END } from 'redux-saga';

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

Home.getInitialProps = async ({ store }) => {
  store.dispatch(authTokenActions.GetUserEmail());
  return {};
};

export default Home;
