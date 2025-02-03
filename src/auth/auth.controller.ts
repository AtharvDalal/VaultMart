import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDtos } from './register.dto';
import { loginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUpuser(@Body() signupDtp: signUpDtos) {
    return this.authService.signUpuser(signupDtp);
  }

  @Post('login')
  loginUser(@Body() loginDto: loginDto) {
    return this.authService.loginUser(loginDto);
  }
}
