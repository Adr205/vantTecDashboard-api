import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class UpdateRepositoryDto {

    @ApiProperty({
        description: 'Repository ID',
        example: '123456789',
        required: true,
        type: String,
    })
    id: string;

    @ApiProperty({
        description: 'Repository Title',
        example: 'Simulaciones UUV',
        required: true,
        type: String,
    })
    title: string;

    @ApiProperty({
        description: 'Repository Description',
        example: 'Este repositorio contiene las simulaciones realizadas en el proyecto UUV',
        required: true,
        type: String,
    })
    description: string;

    @ApiProperty({
        description: 'Repository URL',
        example: 'https://github.com/vanttec/simulaciones-uuv',
        required: true,
        type: String,
    })
    url: string;

    @ApiProperty({
        description: 'Repository Tags',
        example: ["UUV", "Simulaciones","Research"],
        required: true,
        type: String,
    })
    tags: string[];

    @ApiProperty({
        description: 'Repository User',
        example: 'John Doe',
        required: true,
        type: String,
    })
    user: string;

    @ApiProperty({
        description: 'Repository UserID',
        example: '123456789',
        required: true,
        type: String,
    })
    userID: string;

    @ApiProperty({
        description: 'Repository Saved',
        example: true,
        required: true,
        type: String,
    })
    saved: boolean;

}
