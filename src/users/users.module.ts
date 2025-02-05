import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { userProduct } from './entities/user.productsEnitiy';
import { Products } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, userProduct, Products]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
