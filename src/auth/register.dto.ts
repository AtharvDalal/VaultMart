import { IsEmail, MinLength } from 'class-validator';

export class signUpDtos {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
