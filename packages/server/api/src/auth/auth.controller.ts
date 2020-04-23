import { UserIdDto } from './dto/user-id.dto';
import { UserInterface } from '@cupcake/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthTokenDto } from './dto/auth-token.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './../common/guards/local-auth.guard';
import { JwtAuthGuard } from './../common/guards/jwt-auth.guard';
import {
  Controller,
  UseGuards,
  Post,
  Req,
  Get,
  Body,
  Res,
} from '@nestjs/common';
import { mapClasses } from 'class-mapper';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';

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
  async signIn(@Req() req: RequestWithUsers, @Res() res: Response) {
    const tokens = await this.authService.signIn(req.user);
    res.cookie('jid', tokens.refreshToken, { httpOnly: true });
    res.send(mapClasses(tokens, AuthTokenDto));
  }

  @ApiResponse({
    status: 201,
    description: '',
    type: AuthTokenDto,
  })
  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const tokens = await this.authService.signUp(createUserDto);
    res.cookie('jid', tokens.refreshToken, { httpOnly: true });
    res.send(mapClasses(tokens, AuthTokenDto));
  }

  @ApiResponse({
    status: 201,
    description: '',
    type: AuthTokenDto,
  })
  @Post('refresh_token')
  async refreshToken(@Req() req, @Res() res: Response) {
    const refreshToken = req.cookies.jid;
    const tokens = await this.authService.refresh(refreshToken);
    res.cookie('jid', tokens.refreshToken, { httpOnly: true });
    res.send(mapClasses(tokens, AuthTokenDto));
  }

  @ApiResponse({
    status: 200,
    description: '',
  })
  @Post('revoke_token')
  async rewokeToken(@Body() userIdDto: UserIdDto) {
    return await this.authService.revokeToken(userIdDto.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
