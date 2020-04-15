import { UserInterface } from '@cupcake/common';
import { User } from './entity/user.entity';
import { Injectable } from '@nestjs/common';
import {hashPassword} from "../common/utils/crypto.utils";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(user: Omit<UserInterface, "id">) {
    const _user = new User();
    _user.email = user.email;
    _user.password = hashPassword(user.password);
    return this.usersRepository.save(_user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }
  async findOneById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
