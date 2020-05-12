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
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;
const NavBar = styled('div')`
  display: flex;

  button {
    margin-top: 0;
    margin-right: 30px;
  }
`;

export interface HeaderProps {
  isUserLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isUserLoggedIn }: HeaderProps) => {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(authTokensActions.Logout());
  }, []);

  if (isUserLoggedIn) {
    return (
      <HeaderContainer>
        <Status>Status: logged in</Status>
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
      <Status>Status: logged out</Status>
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
