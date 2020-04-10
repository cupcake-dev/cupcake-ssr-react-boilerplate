import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getAuthStatus(): string {
        return this.authService.getAuthStatus();
    }

    @Post("signUp")
    async signUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }
}
