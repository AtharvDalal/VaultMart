import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { Connection, DataSource, Repository } from 'typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { updateProfileDto } from './dto/updateprofile.dto';
import { ZodError } from 'zod';
import { userProduct } from './entities/user.productsEnitiy';
import { Products } from 'src/products/entities/product.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(userProduct) private userProduct: Repository<userProduct>,
    @InjectRepository(Products) private productRepo: Repository<Products>,
    private readonly datasource: DataSource,
  ) {}

  async updateProfile(updateProfileData: Partial<User>, userId: number) {
    try {
      updateProfileDto.parse(updateProfileData);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HttpException({ messsage: 'Validation Failed' }, 400);
      }
      throw error;
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException({ messsage: 'User Not found' }, 400);
    }
    Object.assign(user, updateProfileData);

    const updatedUser = await this.userRepository.merge(
      user,
      updateProfileData,
    );

    await this.userRepository.save(updatedUser);

    return {
      message: 'Profile updated successfully',
      data: updatedUser,
    };
  }

  async buyProduct(userId: number, productId: number) {
    try {
      await this.datasource.query(
        `INSERT INTO userbuyed_products (userId, productId) VALUES (?, ?)`,
        [userId, productId],
      );
      return { message: 'Product purchased successfully' };
    } catch (error) {
      console.log('Error in product but', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
