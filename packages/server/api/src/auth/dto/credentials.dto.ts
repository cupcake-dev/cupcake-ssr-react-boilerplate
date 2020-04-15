import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CredentialsDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
