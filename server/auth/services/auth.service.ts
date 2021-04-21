import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { IUser } from '../../user/models/user.interface';
import { UserEntity } from '../../user/models/user.entity';
import { RegisterDto } from '../models/dto/register.dto';
import { LoginDto } from '../models/dto/login.dto';
import { IJwtResponse } from '../models/jwt-response.interface';
import { UserService } from '../../user/services/user.service';
import { UpdatePasswordDto } from '../models/dto/update-password.dto';
import { UpdateUsernameDto } from '../models/dto/update-username.dto';
import {
  EMAIL_EXISTS,
  INVALID_CREDENTIALS,
  USERNAME_EXISTS,
  USER_UNCONFIRMED,
  USER_CONFIRMED,
} from '../../utils/exception-constants';
import { EmailConfirmationDto } from '../models/dto/email-confirmation.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
    private mailerService: MailerService
  ) {}

  async register(registerDto: RegisterDto): Promise<IUser> {
    const email = registerDto.email;
    const username = registerDto.username;
    const password = registerDto.password;
    if (await this.emailExists(email)) {
      throw new HttpException(EMAIL_EXISTS, HttpStatus.CONFLICT);
    }
    if (await this.usernameExists(username)) {
      throw new HttpException(USERNAME_EXISTS, HttpStatus.CONFLICT);
    }
    registerDto.password = await this.hashPassword(password);
    const user = (await this.userRepository.save(registerDto)) as IUser;
    delete user.password;
    await this.sendEmailConfirmation(user);
    return user;
  }

  async confirmEmail(jwt: string): Promise<{ url: string }> {
    try {
      const decodedJwt = this.jwtService.verify(jwt) as any;
      const user = decodedJwt.user;
      await this.userRepository.update(user.id, { confirmed: true });
      return { url: `${process.env.APP_URL}/auctions` };
    } catch (error) {
      return { url: `${process.env.APP_URL}/email-confirmation` };
    }
  }

  async resendConfirmation(
    emailConfirmationDto: EmailConfirmationDto
  ): Promise<void> {
    const user = await this.findUserByEmail(emailConfirmationDto.email);
    if (!user) {
      throw new HttpException(INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }
    if (user.confirmed) {
      throw new HttpException(USER_CONFIRMED, HttpStatus.UNAUTHORIZED);
    }
    await this.sendEmailConfirmation(user);
  }

  async login(loginDto: LoginDto): Promise<IJwtResponse> {
    const email = loginDto.email;
    const password = loginDto.password;
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new HttpException(INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }
    if (!(await this.passwordMatches(password, user.password as string))) {
      throw new HttpException(INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }
    if (!user.confirmed) {
      throw new HttpException(USER_UNCONFIRMED, HttpStatus.UNAUTHORIZED);
    }
    delete user.password;
    return { jwt: await this.generateJwt(user) } as IJwtResponse;
  }

  async updateUsername(
    id: number,
    updateUsernameDto: UpdateUsernameDto
  ): Promise<IUser> {
    const username = updateUsernameDto.username;
    const password = updateUsernameDto.password;
    const user = await this.userService.findUserById(id);
    if (!(await this.passwordMatches(password, user.password as string))) {
      throw new HttpException(INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }
    if (user.username === username) {
      delete user.password;
      return user;
    }
    if (await this.usernameExists(username)) {
      throw new HttpException(USERNAME_EXISTS, HttpStatus.CONFLICT);
    }
    await this.userRepository.update(id, { username });
    const updatedUser = await this.userService.findUserById(id);
    updatedUser.jwt = await this.generateJwt(updatedUser);
    delete updatedUser.password;
    return updatedUser;
  }

  async updatePassword(
    id: number,
    updatePasswordDto: UpdatePasswordDto
  ): Promise<IUser> {
    const newPassword = updatePasswordDto.newPassword;
    const oldPassword = updatePasswordDto.oldPassword;
    const user = await this.userService.findUserById(id);
    if (!(await this.passwordMatches(oldPassword, user.password as string))) {
      throw new HttpException(INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }
    this.userRepository.update(id, {
      password: await this.hashPassword(newPassword),
    });
    delete user.password;
    return user;
  }

  private findUserByEmail(email: string): Promise<IUser> {
    return this.userRepository.findOne(
      { email },
      { select: ['id', 'email', 'username', 'password', 'confirmed'] }
    ) as Promise<IUser>;
  }

  private async emailExists(email: string): Promise<boolean> {
    return (await this.userRepository.findOne({ email })) ? true : false;
  }

  private async usernameExists(username: string): Promise<boolean> {
    return (await this.userRepository.findOne({ username })) ? true : false;
  }

  private passwordMatches(
    password: string,
    storedPasswordHash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, storedPasswordHash);
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  private generateJwt(user: IUser): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  private async sendEmailConfirmation(user: IUser): Promise<void> {
    const jwt = await this.generateJwt(user);
    this.mailerService.sendMail({
      to: user.email,
      subject: 'Ace of Bids - confirmare cont',
      html: `<a href="${process.env.APP_URL}/api/auth/confirmation/${jwt}" target="_blank">Confirmă email</a>`,
    });
  }
}
