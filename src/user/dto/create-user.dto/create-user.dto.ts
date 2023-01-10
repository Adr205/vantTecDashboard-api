import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    //Firstame, lastName, email, password
    @IsNotEmpty()
    @ApiProperty({
        description: 'User Firstname',
        example: 'John',
        required: true,
        type: String,
    })
    firstName: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'User Lastname',
        example: 'Doe',
        required: true,
        type: String,
    })
    lastName: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'User Email',
        example: 'johndoe@email.com',
        required: true,
        type: String,
        uniqueItems: true,
    })
    email: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'User Password, must have 6 characters minimum',
        example: '123456',
        required: true,
        type: String
    })
    password: string;
}
