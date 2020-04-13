import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { UserInterface } from '@cupcake/common'

export class CreateUserDto implements Omit<UserInterface, "id"> {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
