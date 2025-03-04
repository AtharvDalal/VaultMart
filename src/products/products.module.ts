import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { Products } from './entities/product.entity';
import { S3Service } from '../config/awsS3.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Products])],
  controllers: [ProductController],
  providers: [ProductService, S3Service],
})
export class ProductsModule {}
