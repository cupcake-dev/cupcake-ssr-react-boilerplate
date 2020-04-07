import React, { useState, FormEvent, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthPageContainer } from "../components/styled-elements/styled-elements";

export interface SignInProps {
	status: string;
}

const SignIn: React.FC<any> = (props: SignInProps) => {
	const [isPending, setIsPending] = useState(false);
	// TODO (add redux and create selectors)
	// const login = useSelector();
	// const password = useSelector();
	// const dispatch = useDispatch();

	const handleSignInSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsPending(true);
		console.log("Need to add redux logic"); //TODO
		setTimeout(() => setIsPending(false), 500);
	};

	const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
		// dispatch an action to change login in state...
	};
	const handlePaswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		// dispatch an action to change password in state...
	};

	return (
		<AuthPageContainer>
			<form onSubmit={handleSignInSubmit} className="formWrapper">
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
					<label htmlFor="password">Password</label>
					<input
						// value={password} Uncomment when selectors are ready
						onChange={handlePaswordChange}
						disabled={isPending}
						type="password"
						id="password"
						placeholder="Your password"
					/>
				</div>
				<button type="submit" disabled={isPending}>
					Sign In
				</button>
			</form>
		</AuthPageContainer>
	);
};

export default SignIn;
