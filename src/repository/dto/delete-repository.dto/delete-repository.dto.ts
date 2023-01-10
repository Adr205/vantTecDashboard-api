import { ApiProperty } from '@nestjs/swagger';

export class DeleteRepositoryDto {

    @ApiProperty({
        description: 'Repository ID',
        example: '123456789',
        required: true,
        type: String,
    })
    id: string;
}
