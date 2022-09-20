import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Name must be at least 4 characters' })
  @ApiProperty({ example: 'bambang', type: 'string' })
  full_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Password must be at least 4 characters' })
  @MaxLength(12, { message: 'Password to long' })
  @Matches(/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))/, {
    message: 'password too weak, upper and lower case letters and a number',
  })
  @ApiProperty({ example: 'Bambang12', type: 'string' })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'bambang@gmail.com', type: 'string' })
  email: string;
}
