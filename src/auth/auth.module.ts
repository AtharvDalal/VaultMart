import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'sangam24',
      signOptions: { expiresIn: '20h' },
      global: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}
