import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
export class RegisterAuthDto {

  @ApiProperty({
    description: 'Your First Name',
    example: 'John',
    required: true,
    type: String,
  })
  firstName: string;

  @ApiProperty({
    description: 'Your Last Name',
    example: 'Doe',
    required: true,
    type: String,
  })
  lastName: string;

  @ApiProperty({
    description: 'Your Email',
    example: 'your@email.con',
    required: true,
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Your Password',
    example: 'yourPassword',
    required: true,
    type: String,
  })
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Secret Key',
    example: 'secretKey',
    required: true,
    type: String,
  })
  secretKey: string;
}
