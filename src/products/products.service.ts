import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { updateProduct } from './dto/update.prodcut.validation';
import { UpdateProductDto } from './dto/updateProdcut.dto';

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

  async getAllProdcuts() {
    const getAllProducts = await this.ProductRepo.find();

    return {
      msg: 'Here is your all products',
      data: getAllProducts,
    };
  }

  async updateProduct(productId: number, updateData: UpdateProductDto) {
    const product = await this.ProductRepo.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new HttpException('Product Not Found', 404);
    }

    Object.assign(product, updateData);

    const updateProduct = await this.ProductRepo.merge(product, updateData);

    const saveUpdatedProduct = await this.ProductRepo.save(updateProduct);

    return {
      msg: 'Product was Updated Sucessfully',
      data: saveUpdatedProduct,
    };
  }

  async deleteProduct(productId: number) {
    const product = await this.ProductRepo.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new HttpException('Product Not Found For deletion', 404);
    }

    const deletProduct = await this.ProductRepo.delete(product);

    return {
      msg: 'Product deleted',
      deletProduct,
    };
  }
}
