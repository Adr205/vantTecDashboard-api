import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type RepositoryDocument = Repository & Document;

@Schema()
export class Repository {
    // title, description, url, tags, user, userID, saved

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    url: string;

    @Prop()
    tags: string[];

    @Prop({required: true}) //TODO Checar si usando el ref de la tabla se puede hacer esto
    user: string;

    @Prop({required: true})
    userID: string;

    @Prop({default: false})
    saved: boolean;

}

export const RepositorySchema = SchemaFactory.createForClass(Repository);