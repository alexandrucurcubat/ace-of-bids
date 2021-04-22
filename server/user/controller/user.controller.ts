import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { IUser, UserRole } from 'common/models/user.interface';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @HttpCode(200)
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  findAll(): Promise<IUser[]> {
    return this.userService.findAllUsers();
  }
}
