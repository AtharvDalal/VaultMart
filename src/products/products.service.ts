import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { S3Service } from 'src/config/awsS3.service';
import { updateProDto } from './dto/updateProdcut.dto';
import { Products } from './entities/product.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly ProductRepo: Repository<Products>,
    private readonly s3Service: S3Service,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createProduct(createproductData: any, file: Express.Multer.File) {
    const {
      name,
      description,
      price,
      category,
      brand,
      color,
      discount,
      warranty,
      quantity,
      rating,
      release_date,
      weight,
      image_url,
    } = createproductData;

    const addImage = await this.s3Service.uploadFileToS3(file);

    const createProduct = await this.ProductRepo.create({
      name,
      description,
      price,
      category,
      brand,
      color,
      discount,
      warranty,
      quantity,
      rating,
      release_date,
      weight,
      image_url: addImage,
    });

    const saveProducts = await this.ProductRepo.save(createProduct);

    await this.cacheManager.del('all_products');
    return {
      msg: 'Product created Succesfully',
      data: saveProducts,
    };
  }

  async getAllProdcuts() {
    const cachedProducts =
      await this.cacheManager.get<Products[]>('all_products');

    if (cachedProducts) {
      console.log('Returning cached products');
      return cachedProducts;
    }

    const getAllProducts = await this.ProductRepo.find();

    await this.cacheManager.set('all_products', getAllProducts, 300);

    return {
      msg: 'Here is your all products',
      data: getAllProducts,
    };
  }

  async updateProduct(productId: number, updateData: any) {
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
