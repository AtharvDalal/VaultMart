import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateUser(@Body() updateProfile: UpdateUserDto, @Request() req) {
    const userId = req.user.userId; // The userId from the JWT payload
    const updatedUser = await this.usersService.updateUser(
      userId,
      updateProfile,
    );

    return updatedUser; // Return the updated user
  }

  @Get(':id')
  getUserbyId(@Param('id') id: number) {
    return this.usersService.getUserByid(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':productId/buy')
  async buyProduct(
    @Param('productId') productId: number,
    @Body('userId') userId: number,
    @Body('quantity') quantity: number,
  ) {
    return this.usersService.buyProduct(userId, productId, quantity);
  }
}
