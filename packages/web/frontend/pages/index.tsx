import * as React from "react";
import axios from "axios";
import { PageContainer, Button } from "../components/ui";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import { wrapper } from "@cupcake/webcore";
import { authTokenActions } from "@cupcake/auth-token.module";
import { useSelector, useDispatch } from "react-redux";
import { selectUserEmail } from "@cupcake/auth-token.module/dist/auth-token.selectors";
import { NextPage } from "next";

const Title = styled("h1")`
	font-size: 56px;
`;
const Main = styled("main")`
	margin: 60px 0;
	text-align: center;
	font-size: 20px;
`;

export interface HomeProps {
  email: string;
}

const Home: NextPage<HomeProps> = (props) => {
	const userEmail = useSelector(selectUserEmail);
	const dispatch = useDispatch();

	const handleFetchUserEmail = () => {
		dispatch(authTokenActions.GetUserEmail())
	}

	return (
		<Layout>
			<PageContainer>
				<Main>
					<Title>Welcome to Cupcake Development boilerplate</Title>

					<p>
						Your email: {props.email}
					</p>
					<p>
						Get started by editing this <code>pages/index.js</code>
					</p>

					<div>
						Here should be the info about the usage, motivation,
						examples etc.
					</div>
					<Button onClick={handleFetchUserEmail}>Fetch User Email</Button>
					<p>{userEmail}</p>
				</Main>
			</PageContainer>
		</Layout>
	);
};

Home.getInitialProps = async ({store, pathname, req, res}) => {


	await store.dispatch(authTokenActions.GetUserEmail())
	const userEmail = store.getState().authToken.userEmail
	console.log(userEmail);
	// const instance = axios.create({
	// 	baseURL: "http://localhost:8000",
	// 	timeout: 1000,
	// 	headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lQG1haWwucnUiLCJzdWIiOiIzNzlmZTQ5OC02OGQwLTQ4MmEtYTk0ZC1mYjVmZTE2NGJmM2EiLCJpYXQiOjE1ODcxMTYyMTUsImV4cCI6MTU4NzExOTgxNX0.T4fCv7ZyZqSuprhwz6NHRhY37TJWn9WipF3nFzF4xUw"}
	// });
	// const data = await instance.get("/auth/profile").then(response => {
	// 	return response.data.email
	// })
	

	return {
		email: userEmail
	}
};

export default Home;
