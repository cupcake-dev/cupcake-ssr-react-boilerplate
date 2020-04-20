export interface UserInterface {
  id: string;
  email: string;
  password?: string;
}

export interface AuthTokensInterface {
  accessToken: string;
}

export interface SessionInterface {
  id: string;
}

export interface NewSessionInterface {
  session: SessionInterface;
  tokens: AuthTokensInterface;
}
