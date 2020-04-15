import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface, AuthTokensInterface } from '@cupcake/common';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from "../common/utils/crypto.utils";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && checkPassword(user.password, pass)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: UserInterface): Promise<AuthTokensInterface> {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<AuthTokensInterface> {
    const user = await this.usersService.createUser(createUserDto);
    return await this.signIn(user);
  } // add sessions
}
