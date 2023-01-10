import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    //Firstame, lastName, email, password
    @ApiProperty({
        description: 'User Firstname',
        example: 'John',
        required: true,
        type: String,
    })
    firstName: string;

    @ApiProperty({
        description: 'User Lastname',
        example: 'Doe',
        required: true,
        type: String,
    })
    lastName: string;

    @ApiProperty({
        description: 'User Email',
        example: 'johndoe@email.com',
        required: true,
        type: String,
        uniqueItems: true,
    })
    email: string;

    @ApiProperty({
        description: 'User Password, must have 6 characters minimum',
        example: '123456',
        required: true,
        type: String
    })
    password: string;
}
