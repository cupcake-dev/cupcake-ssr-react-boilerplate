import * as React from 'react';
import { PageContainer, Button } from '../components/ui';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { authTokenActions } from '@cupcake/auth-token.module';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserEmail } from '@cupcake/auth-token.module/dist/auth-token.selectors';
import { NextPage } from 'next';

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
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();

  const handleFetchUserEmail = () => {
    dispatch(authTokenActions.GetUserEmail());
  };

  return (
    <Layout>
      <PageContainer>
        <Main>
          <Title>Welcome to Cupcake Development boilerplate</Title>

          <p>Your email: {userEmail}</p>
          <p>
            Get started by editing this <code>pages/index.js</code>
          </p>

          <div>
            Here should be the info about the usage, motivation, examples etc.
          </div>
          <Button onClick={handleFetchUserEmail}>Fetch User Email</Button>
          <p>{userEmail}</p>
        </Main>
      </PageContainer>
    </Layout>
  );
};

Home.getInitialProps = async ({ store }) => {
  store.dispatch(authTokenActions.GetUserEmail());
  const userEmail = store.getState().authToken.userEmail;
  console.log(userEmail);

  return {};
};

export default Home;
