import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  updateuserProfile(@Body() updateprofileData: any, @Request() req) {
    return this.userService.updateProfile(updateprofileData, req.user.id);
  }
}
