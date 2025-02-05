import {
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
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

  @UseGuards(JwtAuthGuard)
  @Post('buy/:productId')
  buyProducts(
    @Request() req,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    console.log('Request User:', req.user);
    console.log('Extracted User ID:', req.user?.id);

    const userId = req.user?.userId;
    if (!userId) {
      throw new InternalServerErrorException('User ID not found in request');
    }
    return this.userService.buyProduct(userId, productId);
  }
}
