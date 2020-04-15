import { CreateUserDto } from './dto/create-user.dto';
import { AuthTokenDto } from './dto/auth-token.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './../common/guards/local-auth.guard';
import { JwtAuthGuard } from './../common/guards/jwt-auth.guard';
import {
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { mapClasses } from 'class-mapper';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async signIn(@Request() req: any) {
    return mapClasses(
        await this.authService.signIn(req.user), AuthTokenDto
    );
  }

  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return mapClasses(
        await this.authService.signUp(createUserDto), AuthTokenDto
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
