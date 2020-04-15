import React, {
	useState,
	FormEvent,
	ChangeEvent,
	useCallback,
	useEffect,
} from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { withReduxDynamicModules } from "@cupcake/webcore";
import {
	getAuthModule,
	signUpSelectors,
	signUpActions,
	SignUpStatusEnum,
} from "@cupcake/auth.module";
import {
	PageContainer,
	Form,
	InputContainer,
	Label,
	InputText,
	Button,
} from "../components/ui";

export interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
	const [isPending, setIsPending] = useState(false);

	const status = useSelector(signUpSelectors.selectSignUpStatus);
	const email: string = useSelector(signUpSelectors.selectEmail);
	const password: string = useSelector(signUpSelectors.selectPassword);
	const passwordConfirm: string = useSelector(
		signUpSelectors.selectPasswordConfirm
	);
	const dispatch = useDispatch();
	const router = useRouter();

	// TODO useCallback and main logic
	const handleSignUpSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsPending(true);
		dispatch(signUpActions.SignUp());
	}, []);

	const handleEmailChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			// dispatch an action to change Email in state...
			dispatch(signUpActions.ChangeEmail(e.target.value));
		},
		[]
	);
	const handlePasswordChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			// dispatch an action to change Password in state...
			dispatch(signUpActions.ChangePassword(e.target.value));
		},
		[]
	);
	const handlePasswordConfirmChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			// dispatch an action to change PasswordConfirm in state...
			dispatch(signUpActions.ChangePasswordConfirm(e.target.value));
		},
		[]
	);

	useEffect(() => {
		if (status === SignUpStatusEnum.SUCCESS) {
			router.replace("/profile", "profile").then(() => {
				setIsPending(false);
			});
		} else if (status === SignUpStatusEnum.FAIL) {
			setIsPending(false);
			alert('Something goes wrong')
		}
	}, [status]);

	return (
		<PageContainer>
			<Form onSubmit={handleSignUpSubmit}>
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
