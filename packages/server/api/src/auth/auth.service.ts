import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService { //TODO
    getAuthStatus(): string {
        return "Non authorized";
    }
    async signUp(createUserDto: CreateUserDto) {
        return "TODO"
    }
}
