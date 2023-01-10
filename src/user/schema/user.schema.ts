import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    firstName : string;

    @Prop({required: true})
    lastName : string;

    @Prop({ref: 'Repository', default: []})
    savedRepositories: string[];

    @Prop({ref: 'Repository', default: []})
    createdRepositories: string[];
    
}

export const UserSchema = SchemaFactory.createForClass(User);