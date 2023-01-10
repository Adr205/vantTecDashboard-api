import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, AuthDocument } from './schema/auth.schema';
import { Model } from 'mongoose';
import { LoginAuthDto } from './dto/login-auth.dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

const SECRET_KEY = 'VTec2022';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private authModel: Model<AuthDocument>,
    private jwtService: JwtService,
  ) {}

  async register(user: RegisterAuthDto) {
    const { email, password, secretKey } = user;
    const hashedPassword = await hash(password, 10);
    user = { ...user, password: hashedPassword };
    let exist: boolean = false;

    if (secretKey !== SECRET_KEY)
      throw new HttpException('Invalid secret key', 403);

    const userExist = this.authModel.findOne({ email });
    // check if user exist
    try {
      const id = (await userExist).id;
      exist = true;
    } catch {
      // do nothing
    }

    if (exist) throw new HttpException('User already exist', 403);

    const createdUser = this.authModel.create(user);
    if (!createdUser) throw new HttpException('Error creating the user', 500);
    return new HttpException('User created successfully', 200);
  }

  async login(user: LoginAuthDto) {
    const { email, password } = user;
    const findUser = await this.authModel.findOne({ email });

    if (!findUser) throw new HttpException('User not found', 404);

    const isPasswordValid = await compare(password, findUser.password);
    if (!isPasswordValid) throw new HttpException('Invalid credentials', 403);

    const payload = { email: findUser.email, sub: findUser._id };
    const token = this.jwtService.sign(payload);
    return { token, ok: true };
  }
}
