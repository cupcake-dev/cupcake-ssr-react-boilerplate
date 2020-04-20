import { UserInterface } from '@cupcake/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthTokenDto } from './dto/auth-token.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './../common/guards/local-auth.guard';
import { JwtAuthGuard } from './../common/guards/jwt-auth.guard';
import { Controller, UseGuards, Post, Req, Get, Body } from '@nestjs/common';
import { mapClasses } from 'class-mapper';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

interface RequestWithUsers extends Request {
  user: Omit<UserInterface, 'password'>;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: '',
    type: AuthTokenDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async signIn(@Req() req: RequestWithUsers) {
    return mapClasses(await this.authService.signIn(req.user), AuthTokenDto);
  }

  @ApiResponse({
    status: 201,
    description: '',
    type: AuthTokenDto,
  })
  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return mapClasses(
      await this.authService.signUp(createUserDto),
      AuthTokenDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
