import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Product } from './products/entities/product.entity';
import { Purchase } from './products/entities/purchase .enitiy';
import { Category } from './products/entities/category.enitiy';
import { CategorySeeder } from './common/seed';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sangam24',
      database: 'weshop',
      entities: [User, Product, Purchase, Category],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([Category]),

    UsersModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [CategorySeeder],
})
export class AppModule {}
