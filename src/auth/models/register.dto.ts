import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  full_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  password_confirm: string;

  @IsNotEmpty()
  role: string;
}
