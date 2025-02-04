import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly ProductRepo: Repository<Products>,
  ) {}

  async createProduct(createproductData: any) {
    const { productname, desc, price, category } = createproductData;

    const createProduct = await this.ProductRepo.create({
      productname,
      desc,
      price,
      category,
    });

    const saveProducts = await this.ProductRepo.save(createProduct);

    return {
      msg: 'Product created Succesfully',
      data: saveProducts,
    };
  }
}
