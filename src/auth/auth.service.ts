import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { assert } from 'console';
import { signUpDto } from './register.dto';
import { ZodError } from 'zod';
import { loginUserDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signupData: any) {
    try {
      signUpDto.parse(signupData);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HttpException({ messsage: 'Validation Failed' }, 400);
      }
      throw error;
    }

    const { name, email, password } = signupData;

    const checkUserexist = await this.userRepository.findOne({
      where: { email },
    });

    if (checkUserexist) {
      throw new HttpException({ message: 'User existecist' }, 400);
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const saveUser = await this.userRepository.save(newUser);

    return {
      msg: 'User created',
      data: saveUser,
    };
  }

  async loginUser(loginData: any) {
    try {
      loginUserDto.parse(loginData);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HttpException({ messsage: 'Validation Failed' }, 400);
      }
      throw error;
    }

    const { email, password } = loginData;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException({ messsage: 'User Not exist' }, 400);
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new HttpException({ messsage: 'password not match ' }, 400);
    }

    const payload = { userId: user.id, email: user.email };

    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      msg: 'User Logged Successfully',
    };
  }
}
