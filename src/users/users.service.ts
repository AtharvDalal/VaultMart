import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { Product } from 'src/products/entities/product.entity';
import { Purchase } from 'src/products/entities/purchase .enitiy';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  async updateUser(userId: number, updateDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    if (updateDto.name) {
      user.name = updateDto.name;
    }
    if (updateDto.phoneno) {
      user.phoneno = updateDto.phoneno;
    }
    if (updateDto.surname) {
      user.surname = updateDto.surname;
    }

    return this.userRepository.save(user);
  }

  async getUserByid(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async buyProduct(userId: number, productId: number, quantity: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!user || !product) {
      throw new Error('User or Product not found');
    }

    const purchase = new Purchase();
    purchase.user = user;
    purchase.product = product;
    purchase.quantity = quantity;

    await this.purchaseRepository.save(purchase);

    const { password, ...userWithoutPassword } = user;

    return {
      msg: 'Product bued done',
      purchase: {
        quantity: purchase.quantity,
        product: purchase.product,
        user: userWithoutPassword,
        purchase_date: purchase.purchase_date,
      },
    };
  }
}
