import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/products/entities/product.entity';
import { Purchase } from 'src/products/entities/purchase .enitiy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Purchase]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
