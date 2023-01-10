import { Controller, Get, Post, Body, UseGuards, Put, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RepositoryService } from './repository.service';
import { CreateRepositoryDto } from './dto/create-repository.dto/create-repository.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateRepositoryDto } from './dto/update-repository.dto/update-repository.dto';
import { DeleteRepositoryDto } from './dto/delete-repository.dto/delete-repository.dto';
import { identity } from 'rxjs';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('repositories')
@Controller('repository')
export class RepositoryController {

    constructor(private readonly repositoryService: RepositoryService){}


    @Get()
    getAllRepositories(){
        return this.repositoryService.getAllRepositories();
    }

    @Get(':id')
    getRepositoryById(@Param('id') id : string){
        return this.repositoryService.getRepositoryById(id);
    }

    @Post()
    createRepository(@Body() repository : CreateRepositoryDto){
        return this.repositoryService.createRepository(repository);
    }

    @Put(':id')
    updateRepository( @Param('id') id: string ,@Body() repository : UpdateRepositoryDto){
        return this.repositoryService.updateRepository(id, repository);
    }

    @Delete(':id')
    deleteRepository(@Param('id') id:string , @Body() repository : DeleteRepositoryDto){
        return this.repositoryService.deleteRepository(id);
    }

}
