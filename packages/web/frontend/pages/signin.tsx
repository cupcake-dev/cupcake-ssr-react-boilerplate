import React, { useState, FormEvent, ChangeEvent, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withReduxDynamicModules } from "@cupcake/webcore";
import {
	getAuthModule,
	signInSelectors,
	signInActions,
} from "@cupcake/auth.module";
import {
	PageContainer,
	Form,
	InputContainer,
	Label,
	InputText,
	Button,
} from "../components/styled-elements/";

export interface SignInProps {}

const SignIn: React.FC<SignInProps> = (props: SignInProps) => {
	const [isPending, setIsPending] = useState(false);

	const status = useSelector(signInSelectors.selectSignInStatus);
	const login: string = useSelector(signInSelectors.selectLogin);
	const password: string = useSelector(signInSelectors.selectPassword);
	const dispatch = useDispatch();

	const handleSignInSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsPending(true);
		console.log(login, password); //TODO
		setTimeout(() => setIsPending(false), 500);
	};

	const handleLoginChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			// dispatch an action to change login in state...
			dispatch(new signInActions.ChangeLogin(e.target.value));
		},
		[login]
	);
	const handlePaswordChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			// dispatch an action to change password in state...
			dispatch(new signInActions.ChangePassword(e.target.value));
		},
		[password]
	);

	return (
		<PageContainer>
			<Form onSubmit={handleSignInSubmit}>
				<InputContainer>
					<Label htmlFor="login">Login</Label>
					<InputText
						value={login}
						onChange={handleLoginChange}
						disabled={isPending}
						type="text"
						id="login"
						placeholder="Your login"
					/>
				</InputContainer>
				<InputContainer>
					<Label htmlFor="password">Password</Label>
					<InputText
						value={password}
						onChange={handlePaswordChange}
						disabled={isPending}
						type="password"
						id="password"
						placeholder="Your password"
					/>
				</InputContainer>
				<Button type="submit" disabled={isPending}>
					Sign In
				</Button>
			</Form>
		</PageContainer>
	);
};

export default withReduxDynamicModules(SignIn, [getAuthModule()]);
