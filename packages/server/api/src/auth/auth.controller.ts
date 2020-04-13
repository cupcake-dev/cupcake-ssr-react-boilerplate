import { JwtAuthGuard } from './../common/guards/jwt-auth.guard';
import { Controller, UseGuards } from '@nestjs/common';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthController {

}
