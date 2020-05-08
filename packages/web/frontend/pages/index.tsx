import * as React from 'react';
import { PageContainer } from '../components/ui';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { NextPage } from 'next';
import { withReduxDynamicModules } from '@cupcake/webcore';
import {
  getProfileModule,
  selectUserEmail,
  profileActions,
} from '@cupcake/profile.module';
import { useSelector } from 'react-redux';

const Title = styled('h1')`
  font-size: 56px;
`;
const SubTitle = styled('h2')`
  font-size: 28px;
`;
const Main = styled('main')`
  margin: 60px 0;
  text-align: center;
  font-size: 20px;
`;

export interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const email = useSelector(selectUserEmail);

  return (
    <Layout>
      <PageContainer>
        <Main>
          <Title>Welcome to Cupcake Development boilerplate</Title>
          {email && <SubTitle>{`You logged in as: ${email}`}</SubTitle>}
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

Home.getInitialProps = async ({ store }) => {
  store.dispatch(profileActions.GetUserProfile());
};

export default withReduxDynamicModules(Home, [getProfileModule()]);
