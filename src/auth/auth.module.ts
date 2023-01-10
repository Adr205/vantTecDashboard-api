import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, AuthSchema } from './schema/auth.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema:AuthSchema }]),
        JwtModule.register({
            secret: 'secret',
            signOptions: {expiresIn: '1d'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
