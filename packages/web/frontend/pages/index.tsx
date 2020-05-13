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
  @media (max-width: 640px) {
    font-size: 40px;
  }
`;
const SubTitle = styled('h2')`
  font-size: 28px;
`;
const Main = styled('main')`
  margin: 60px 0;
  text-align: center;
  font-size: 20px;
`;
const ParagraphHeader = styled.h3`
  text-align: start;
  padding: 0 30px;
`;
const Paragraph = styled.p`
  text-align: start;
  padding: 0 30px;
`;

export interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const email = useSelector(selectUserEmail);

  return (
    <Layout>
      <PageContainer>
        <Main>
          <Title>Welcome to Cupcake Development boilerplate</Title>
          {email && <SubTitle>{`You are logged in as: ${email}`}</SubTitle>}
          <ParagraphHeader>Overview</ParagraphHeader>
          <Paragraph>
            This boilerplate is a use case of combining React JS with Server
            Side Rendering (Next JS framework), Redux with Redux-Dynamic-Modules
            as a state management system and backend Node.js framework NestJS.
            It could serve as a starter kit for development of medium size and
            large projects.
          </Paragraph>
          <Paragraph>
            Read full description at{' '}
            <a href="#">Cupcake Developnemt Boilerplate Github Page.</a>
          </Paragraph>
          <ParagraphHeader>Our Motivation</ParagraphHeader>
          <Paragraph>
            Nowadays, a lot of commercial projects require the SEO and
            performance optimization. Additionally, it’s necessary to have code
            splitting for large projects. Frameworks and libraries that we used
            for Cupcake boilerplate were selected according these requirements.
          </Paragraph>
          <Paragraph>
            So, Next JS has all benefits that come with React JS and helps us
            with server side rendering and routing, also it has automatic code
            splitting for faster page loading.
          </Paragraph>
          <Paragraph>
            For state management we decided to use the most popular library -
            Redux, but we added Redux Dynamic Modules as a tool for code
            splitting. Thus, Redux modules (reducers and middleware) can be
            dynamically added or removed to the Redux store at runtime. Also it
            can be reused if our customer want to make a mobile application.
          </Paragraph>
          <Paragraph>
            On the server-side, we need a framework that helps to build
            scalable, easily maintainable, well testable applications. Nest JS
            is ideal candidate for this work, because it provides a great
            application architecture out of the box and has a support of the
            other popular libraries such as TypeORM or Passport JS.
          </Paragraph>
          <Paragraph>
            And last but not least, Lerna is a perfect tool for managing
            projects and organizing their codebases into mono-repository, that
            allows to share node_modules among our packages.
          </Paragraph>
          <Paragraph>
            Combining all these technologies helps us to develop modern and
            scalable projects, which meet our clients’ requirements.
          </Paragraph>
        </Main>
      </PageContainer>
    </Layout>
  );
};

Home.getInitialProps = async ({ store }) => {
  store.dispatch(profileActions.GetUserProfile());
};

export default withReduxDynamicModules(Home, [getProfileModule()]);
