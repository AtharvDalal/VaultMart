import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Purchase } from './entities/purchase .enitiy';
import { Category } from './entities/category.enitiy';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Purchase) private PurchasRepo: Repository<Purchase>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(products: CreateProductDto[]) {
    const validCategories = ['Electronics', 'Clothing', 'Groceries'];
    const createProductEntities = await Promise.all(
      products.map(async (productDto) => {
        const product = new Product();
        product.name = productDto.name;
        product.price = productDto.price;
        product.description = productDto.description;

        const category = await this.categoryRepo.findOne({
          where: { name: productDto.categoryname },
        });

        if (!category) {
          throw new BadRequestException(
            `Category "${productDto.categoryname}" does not exist in the database.`,
          );
        }

        product.category = category;
        return product;
      }),
    );

    const savedProducts = await this.productRepo.save(createProductEntities);
    return {
      msg: 'Products created successfully',
      savedProducts,
    };
  }

  async updateProductdeatils(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product now found');
    }
    updateProductDto.name;
    updateProductDto.price;
    updateProductDto.description;

    const updateProduct = await this.productRepo.save(updateProductDto);

    return {
      msg: 'Products sucessfull updated',
      updateProduct,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
