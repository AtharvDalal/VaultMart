import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { signUpDtos } from './register.dto';
import { loginDto } from './login.dto';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUpuser(creaditinals: signUpDtos) {
    console.log(creaditinals);
    const { email, password } = creaditinals;

    const checkExisting = await this.userRepository.findOne({
      where: { email },
    });
    if (checkExisting) {
      throw new HttpException('User Already Exists', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const HashPassword = await bcrypt.hash(password, salt);

    const newUser = await this.userRepository.create({
      email,
      password: HashPassword,
    });

    const saveUser = await this.userRepository.save(newUser);
    return saveUser;
  }

  async loginUser(creadinatils: loginDto) {
    const { email, password } = creadinatils;

    const CheckUserExist = await this.userRepository.findOneBy({ email });

    if (!CheckUserExist) {
      throw new HttpException('User Not Exists', 400);
    }

    const Mathcpassword = await bcrypt.compare(
      password,
      CheckUserExist.password,
    );
    if (!Mathcpassword) {
      throw new HttpException('Incorrect password', 400);
    }

    const payload = { userId: CheckUserExist.id, email: CheckUserExist.email };
    const token = this.jwtService.sign(payload);

    return {
      accesToken: token,
      msg: 'Login Successfully',
    };
  }
}
