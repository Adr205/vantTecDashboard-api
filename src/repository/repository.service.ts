import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository, RepositoryDocument } from './schema/repository.schema';
import { CreateRepositoryDto } from './dto/create-repository.dto/create-repository.dto';
import { UserService } from '../user/user.service';
import { UpdateRepositoryDto } from './dto/update-repository.dto/update-repository.dto';
import { DeleteRepositoryDto } from './dto/delete-repository.dto/delete-repository.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectModel(Repository.name)
    private readonly repositoryModel: Model<RepositoryDocument>,
    // @InjectModel(User.name)
    // private readonly userModel: Model<AuthDocument>,
    private readonly userService: UserService,
  ) {}

  async getAllRepositories() {
    return await this.repositoryModel.find();
  }

  async getRepositoryById(id: string) {
    const repository = await this.repositoryModel.findById(id);
    if (!repository) throw new HttpException('Repository not found', 404);
    return repository;
  }

  async createRepository(repository: CreateRepositoryDto) {
    // const {firstName, lastName} = repository; //TODO: Get user from token
    const firstName = 'Adrian';
    const lastName = 'Villa';
    const userID = '63919b73dfe363802244adce';

    repository = {...repository, user: `${firstName} ${lastName}`, userID};

    // const userExist = await this.userModel.findById(userID);
    // if (!userExist) throw new HttpException('User not found', 404);

    const createdRepository = this.repositoryModel.create(repository);
    if (!createdRepository) throw new HttpException('Error creating the repository', 500);

    // userExist.createdRepositories.push((await createdRepository)._id);
    // await userExist.save();

    await this.userService.addCreatedRepository(userID, (await createdRepository)._id);
    
    return new HttpException('Repository created successfully', 200);
  }

  async updateRepository( id:string, repository: UpdateRepositoryDto) {
    const repositoryExist = await this.repositoryModel.findById(id);
    if(!repositoryExist) throw new HttpException('Repository not found', 404);

    const updatedRepository = await this.repositoryModel.findByIdAndUpdate(id, repository, {new: true});
    if(!updatedRepository) throw new HttpException('Error updating the repository', 500);

    return new HttpException('Repository updated successfully', 200);
  }

  async deleteRepository(id:string) {
    const repositoryExist = await this.repositoryModel.findById(id);
    if(!repositoryExist) throw new HttpException('Repository not found', 404);

    const deletedRepository = await this.repositoryModel.findByIdAndDelete(id);
    if(!deletedRepository) throw new HttpException('Error deleting the repository', 500);

    return new HttpException('Repository deleted successfully', 200);
  }
}
