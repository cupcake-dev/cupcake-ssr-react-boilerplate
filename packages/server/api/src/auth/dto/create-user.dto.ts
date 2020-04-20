import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { UserInterface } from '@cupcake/common'
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements Omit<UserInterface, "id"> {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
