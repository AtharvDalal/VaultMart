import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './register.dto';
import { loginUserDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUpuser(@Body() signupdto: typeof signUpDto) {
    return this.authService.signUp(signupdto);
  }

  @Post('login')
  loginUser(@Body() loginDto: typeof loginUserDto) {
    return this.authService.loginUser(loginDto);
  }
}
