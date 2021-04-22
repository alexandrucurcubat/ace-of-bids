import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUser } from 'common/models/user.interface';
import { UserEntity } from 'common/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  findUserById(id: number): Promise<IUser> {
    return this.userRepository.findOne(
      { id },
      { select: ['id', 'email', 'username', 'password', 'role'] }
    ) as Promise<IUser>;
  }

  findAllUsers(): Promise<IUser[]> {
    return this.userRepository.find() as Promise<IUser[]>;
  }
}
