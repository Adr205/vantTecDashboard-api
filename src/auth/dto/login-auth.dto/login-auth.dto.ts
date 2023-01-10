import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    description: 'Your Email',
    example: 'javier@email.con',
    // example: 'your@email.con',
    required: true,
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Your Password',
    // example: 'yourPassword',
    example: 'Ferrari2013',
    required: true,
    type: String,
  })
  @MinLength(8)
  password: string;
}
