import {
  createRefreshToken,
  validateRefreshToken,
} from './../common/utils/refresh-token.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface, AuthTokensInterface } from '@cupcake/common';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from '../common/utils/crypto.utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<UserInterface, 'password'>> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && checkPassword(user.password, pass)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: UserInterface): Promise<any> {
    const payload = { email: user.email, sub: user.id };
    const refreshToken = createRefreshToken(user);
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken,
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.createUser(createUserDto);
    return await this.signIn(user);
  }

  async refresh(token: string): Promise<any> {
    if (!token) {
      return {
        accessToken: '',
        refreshToken: '',
      };
    }
    let payload: any;
    try {
      payload = validateRefreshToken(token);
    } catch (err) {
      console.log(err);
      return {
        accessToken: '',
        refreshToken: '',
      };
    }

    // here refresh token is valid, so we can send back an access token
    const user = await this.usersService.findOneByEmail(payload.email);
    if (!user) {
      return {
        accessToken: '',
        refreshToken: '',
      };
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return {
        accessToken: '',
        refreshToken: '',
      };
    }

    return await this.signIn(user);
  }

  async revokeToken(userId: string): Promise<boolean> {
    await this.usersService.incrementTokenVersion(userId);
    return true;
  }
}
