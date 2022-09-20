import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty({ example: 'bambang', type: 'string' })
  full_name?: string;

  @ApiProperty({ example: 'bambang212@gmail.com', type: 'string' })
  email?: string;
}
