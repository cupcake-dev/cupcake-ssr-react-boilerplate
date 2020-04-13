import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './common/guards/local-auth.guard';
import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
