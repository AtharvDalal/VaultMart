import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Exclude()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
