
import { Controller, Get, Body, Post } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto/login-auth.dto';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){

    }
    
    @Post('login')
    login(@Body() user: LoginAuthDto){
        return this.authService.login(user);
    }

    @Post('register')
    register(@Body() user: RegisterAuthDto){
        return this.authService.register(user);
    }

}
