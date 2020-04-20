import React, { useCallback } from "react";
import Link from "next/link";
import { Button } from "../ui";
import styled from "styled-components";
import { AuthTokensInterface } from "@cupcake/common";
import { useDispatch } from "react-redux";
import { authTokenActions } from "@cupcake/auth-token.module";

const HeaderContainer = styled("header")`
	background-color: #0089d2;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const Status = styled("h2")`
	margin-left: 30px;
	color: #fff;
`;
const NavBar = styled("div")`
	display: flex;

	button {
		margin-top: 0;
		margin-right: 30px;
	}
`;

export interface HeaderProps {
	authToken: AuthTokensInterface | null;
}

const Header: React.FC<HeaderProps> = ({ authToken }) => {
	const dispatch = useDispatch();

	const handleLogout = useCallback(() => {
		dispatch(authTokenActions.RemoveToken());
	}, []);

	if (authToken) {
		return (
			<HeaderContainer>
				<Status>You are logged in</Status>
				<NavBar>
					<Link href="/">
						<Button>Home</Button>
					</Link>
					<Button onClick={handleLogout}>Logout</Button>
				</NavBar>
			</HeaderContainer>
		);
	}

	return (
		<HeaderContainer>
			<Status>You are not logged in</Status>
			<NavBar>
				<Link href="/">
					<Button>Home</Button>
				</Link>
				<Link href="/signin">
					<Button>Sign In</Button>
				</Link>
				<Link href="/signup">
					<Button>Sign Up</Button>
				</Link>
			</NavBar>
		</HeaderContainer>
	);
};

export default Header;
