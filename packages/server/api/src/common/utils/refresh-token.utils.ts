import { UserInterface } from '@cupcake/common';
import { config } from 'dotenv';
import * as jwt from 'jsonwebtoken';

config();

export const createRefreshToken = (user: UserInterface) => {
  return jwt.sign(
    { email: user.email, sub: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    },
  );
};

export const validateRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};
