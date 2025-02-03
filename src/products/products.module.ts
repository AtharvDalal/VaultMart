import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Purchase } from './entities/purchase .enitiy';
import { User } from 'src/users/entities/user.entity';
import { Category } from './entities/category.enitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Purchase, Category])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
