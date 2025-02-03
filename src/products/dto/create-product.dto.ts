import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { Purchase } from '../entities/purchase .enitiy';
import { Category } from '../entities/category.enitiy';

export class CreateProductDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  categoryname: string;

  @IsOptional() // Mark it optional
  purchases?: Purchase[];
}
