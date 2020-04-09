import React, { useState, FormEvent, ChangeEvent, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withReduxDynamicModules } from "@cupcake/webcore";
import {
	getAuthModule,
	signUpSelectors,
	signUpActions,
} from "@cupcake/auth.module";
import {
	PageContainer,
	Form,
	InputContainer,
	Label,
	InputText,
	Button,
} from "../components/styled-elements/";

export interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
	const [isPending, setIsPending] = useState(false);

	const status = useSelector(signUpSelectors.selectSignUpStatus);
	const login: string = useSelector(signUpSelectors.selectLogin);
	const email: string = useSelector(signUpSelectors.selectEmail);
	const password: string = useSelector(signUpSelectors.selectPassword);
	const passwordConfirm: string = useSelector(
		signUpSelectors.selectPasswordConfirm
	);
	const dispatch = useDispatch();

	const handleSignUpSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsPending(true);
		console.log("Need to add redux logic"); //TODO
		setTimeout(() => setIsPending(false), 500);
	};

	const handleLoginChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			// dispatch an action to change login in state...
			dispatch(new signUpActions.ChangeLogin(e.target.value));
		},
		[login]
	);
	const handleEmailChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			// dispatch an action to change Email in state...
			dispatch(new signUpActions.ChangeEmail(e.target.value));
		},
		[email]
	);
	const handlePasswordChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			// dispatch an action to change Password in state...
			dispatch(new signUpActions.ChangePassword(e.target.value));
		},
		[password]
	);
	const handlePasswordConfirmChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			// dispatch an action to change PasswordConfirm in state...
			dispatch(new signUpActions.ChangePasswordConfirm(e.target.value));
		},
		[passwordConfirm]
	);

	return (
		<PageContainer>
			<Form onSubmit={handleSignUpSubmit}>
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
					<Label htmlFor="email">Email</Label>
					<InputText
						value={email}
						onChange={handleEmailChange}
						disabled={isPending}
						type="text"
						id="email"
						placeholder="Your email"
					/>
				</InputContainer>
				<InputContainer>
					<Label htmlFor="password">Password</Label>
					<InputText
						value={password}
						onChange={handlePasswordChange}
						disabled={isPending}
						type="password"
						id="password"
						placeholder="Your password"
					/>
				</InputContainer>
				<InputContainer>
					<Label htmlFor="passwordConfirm">Password Confirm</Label>
					<InputText
						value={passwordConfirm}
						onChange={handlePasswordConfirmChange}
						disabled={isPending}
						type="password"
						id="passwordConfirm"
						placeholder="Repeat password"
					/>
				</InputContainer>
				<Button type="submit" disabled={isPending}>
					Sign Up
				</Button>
			</Form>
		</PageContainer>
	);
};

export default withReduxDynamicModules(SignUp, [getAuthModule()]);
