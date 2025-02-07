import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { JoiValidationPipe } from 'src/common/pipes/joi.validation';
import { createProduct } from './dto/create-product.dto';
import { updateProductDtoVal } from './dto/update.prodcut.validation';

import { FileInterceptor } from '@nestjs/platform-express';
import { updateProDto } from './dto/updateProdcut.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Body() createProductData: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('Product Data:', createProductData);
    console.log('Uploaded File:', file);
    const product = await this.productService.createProduct(
      createProductData,
      file,
    );
    return product;
  }

  @Get('getall')
  getAllProducts() {
    return this.productService.getAllProdcuts();
  }

  @Patch('update/:id')
  @UsePipes(new JoiValidationPipe(updateProductDtoVal))
  updateProduct(
    @Param('id') id: number,
    @Body() updateData: typeof updateProDto,
  ) {
    return this.productService.updateProduct(id, updateData);
  }

  @Delete('delete/:id')
  deleteProduct(id: number) {
    return this.productService.deleteProduct(id);
  }
}
