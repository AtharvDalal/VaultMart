import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Category } from 'src/common/enums/category';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  productname?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;
}
