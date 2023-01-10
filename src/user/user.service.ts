import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { resolve } from 'path';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

    //Crud operations

    //Get users
    async getUsers(){
        return await this.userModel.find();
    }

    //Get user by id
    async getUserById(id: string){
        const user = await this.userModel.findById(id);
        if(!user) throw new HttpException('User not found', 404);
        return user;
    }

    //Create user
    async createUser(user: CreateUserDto){
      const userExist = await this.userModel.findOne({email: user.email});
      if(userExist) throw new HttpException('User already exist', 409);
      const newUser = new this.userModel(user);
      return await newUser.save();
    }

    //Update user
    async updateUser(id: string, user: UpdateUserDto){
      const userExist = await this.userModel.findById(id);
      if(!userExist) throw new HttpException('User not found', 404);
      await this.userModel.findByIdAndUpdate(id, user);
      return await this.userModel.findById(id);
    }

    //Delete user
    async deleteUser(id: string){
      const userExist = await this.userModel.findById(id);
      if (!userExist) throw new HttpException('User not found', 404);
      return await this.userModel.findByIdAndDelete(id);
    }


  async addCreatedRepository(userID: string, repositoryID: string) {
    ///TODO: Add created repository to user
    const userExist = await this.userModel.findById(userID);
    if (!userExist) throw new HttpException('User not found', 404);

    userExist.createdRepositories.push(repositoryID);
    await userExist.save();
    resolve();
  }

  async addSavedRepository(userID: string, repositoryID: string) {
    const userExist = await this.userModel.findById(userID);
    if (!userExist) throw new HttpException('User not found', 404);

    userExist.savedRepositories.push(repositoryID);
    await userExist.save();
    resolve();
  }
}
