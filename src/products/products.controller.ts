import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ProductService } from './products.service';
import { JoiValidationPipe } from 'src/common/pipes/joi.validation';
import { createProduct } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UsePipes(new JoiValidationPipe(createProduct))
  createProduct(@Body() createProductData: any) {
    return this.productService.createProduct(createProductData);
  }

  @Get('getall')
  getAllProducts() {
    return this.productService.getAllProdcuts();
  }
}
