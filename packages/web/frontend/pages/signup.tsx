import React, { useState, FormEvent, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthPageContainer } from "../components/styled-elements/styled-elements";

export interface SignUpProps {}

const SignUp: React.FC<any> = () => {
	const [isPending, setIsPending] = useState(false);
	// TODO (add redux and create selectors)
	// const login = useSelector();
	// const email = useSelector();
	// const password = useSelector();
	// const passwordConfirm = useSelector();
	// const dispatch = useDispatch();

	const handleSignUpSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsPending(true);
		console.log("Need to add redux logic"); //TODO
		setTimeout(() => setIsPending(false), 500);
	};

	const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
		// dispatch an action to change login in state...
	};
	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		// dispatch an action to change Email in state...
	};
	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		// dispatch an action to change Password in state...
	};
	const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
		// dispatch an action to change PasswordConfirm in state...
	};

	return (
		<AuthPageContainer>
			<form onSubmit={handleSignUpSubmit} className="formWrapper">
				<div className="inputWrapper">
					<label htmlFor="login">Login</label>
					<input
						// value={login} Uncomment when selectors are ready
						onChange={handleLoginChange}
						disabled={isPending}
						type="text"
						id="login"
						placeholder="Your login"
					/>
				</div>
				<div className="inputWrapper">
					<label htmlFor="email">Email</label>
					<input
						// value={email} Uncomment when selectors are ready
						onChange={handleEmailChange}
						disabled={isPending}
						type="text"
						id="email"
						placeholder="Your email"
					/>
				</div>
				<div className="inputWrapper">
					<label htmlFor="password">Password</label>
					<input
						// value={password} Uncomment when selectors are ready
						onChange={handlePasswordChange}
						disabled={isPending}
						type="password"
						id="password"
						placeholder="Your password"
					/>
				</div>
				<div className="inputWrapper">
					<label htmlFor="passwordConfirm">Password Confirm</label>
					<input
						// value={passwordConfirm} Uncomment when selectors are ready
						onChange={handlePasswordConfirmChange}
						disabled={isPending}
						type="password"
						id="passwordConfirm"
						placeholder="Repeat password"
					/>
				</div>
				<button type="submit" disabled={isPending}>
					Sign Up
				</button>
			</form>
		</AuthPageContainer>
	);
};

export default SignUp;
