import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from '../services/user.service';
import { UserRole } from '../models/user-role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { IUser } from '../models/user.interface';

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
