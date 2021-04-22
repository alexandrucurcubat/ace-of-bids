import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class PasswordResetDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true })
  email: string;
}
