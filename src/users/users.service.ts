import { HttpException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { updateProfileDto } from './dto/updateprofile.dto';
import { ZodError } from 'zod';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async updateProfile(updateProfileData: Partial<User>, userId: number) {
    try {
      updateProfileDto.parse(updateProfileData);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HttpException({ messsage: 'Validation Failed' }, 400);
      }
      throw error;
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException({ messsage: 'User Not found' }, 400);
    }
    Object.assign(user, updateProfileData);

    const updatedUser = await this.userRepository.merge(
      user,
      updateProfileData,
    );

    await this.userRepository.save(updatedUser);

    return {
      message: 'Profile updated successfully',
      data: updatedUser,
    };
  }
}
