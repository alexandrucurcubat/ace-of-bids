import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { LoginDto } from 'common/dto/login.dto';
import { RegisterDto } from 'common/dto/register.dto';
import { UpdateUsernameDto } from 'common/dto/update-username.dto';
import { UpdatePasswordDto } from 'common/dto/update-password.dto';
import { EmailConfirmationDto } from 'common/dto/email-confirmation.dto';
import { IUser } from 'common/models/user.interface';
import { IJwtResponse } from 'common/models/jwt-response.interface';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ParamGuard } from '../guards/param.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  register(@Body() registerDto: RegisterDto): Promise<IUser> {
    return this.authService.register(registerDto);
  }

  @Post('confirmation/resend')
  @HttpCode(200)
  resendConfirmation(
    @Body() emailConfirmationDto: EmailConfirmationDto
  ): Promise<void> {
    return this.authService.resendConfirmation(emailConfirmationDto);
  }

  @Get('confirmation/:jwt')
  @HttpCode(200)
  @Redirect(process.env.APP_URL)
  confirm(@Param('jwt') jwt: string): Promise<{ url: string }> {
    return this.authService.confirmEmail(jwt);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDto): Promise<IJwtResponse> {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard, ParamGuard)
  @Post('update/username/:id')
  @HttpCode(200)
  @ApiBearerAuth()
  updateUsername(
    @Param('id') id: number,
    @Body() updateUsernameDto: UpdateUsernameDto
  ): Promise<IUser> {
    return this.authService.updateUsername(id, updateUsernameDto);
  }

  @UseGuards(JwtAuthGuard, ParamGuard)
  @Post('update/password/:id')
  @HttpCode(200)
  @ApiBearerAuth()
  updatePassword(
    @Param('id') id: number,
    @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<IUser> {
    return this.authService.updatePassword(id, updatePasswordDto);
  }
}
