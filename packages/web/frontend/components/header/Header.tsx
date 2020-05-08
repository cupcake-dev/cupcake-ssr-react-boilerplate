import React, { useCallback } from 'react';
import Link from 'next/link';
import { Button } from '../ui';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { authTokensActions } from '@cupcake/auth.module';

const HeaderContainer = styled('header')`
  background-color: #0089d2;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Status = styled('h2')`
  margin-left: 30px;
  color: #fff;
`;
const NavBar = styled('div')`
  display: flex;

  button {
    margin-top: 0;
    margin-right: 30px;
  }
`;

export interface HeaderProps {
  userEmail: string;
}

const Header: React.FC<HeaderProps> = ({ userEmail }: HeaderProps) => {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(authTokensActions.Logout());
  }, []);

  if (userEmail) {
    return (
      <HeaderContainer>
        <Status>You are logged in as: {userEmail}</Status>
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
