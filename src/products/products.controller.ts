import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { JoiValidationPipe } from 'src/common/pipes/joi.validation';
import { createProduct } from './dto/create-product.dto';
import { updateProduct } from './dto/update.prodcut.validation';
import { UpdateProductDto } from './dto/updateProdcut.dto';

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

  @Patch('update/:id')
  @UsePipes(new JoiValidationPipe(updateProduct))
  updateProduct(@Param('id') id: number, @Body() updateData: UpdateProductDto) {
    return this.productService.updateProduct(id, updateData);
  }

  @Delete('delete/:id')
  deleteProduct(id: number) {
    return this.productService.deleteProduct(id);
  }
}
