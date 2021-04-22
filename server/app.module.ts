import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';
import { AuthModule } from 'src/app/auth/auth.module';
import { AppServerModule } from '../src/main.server';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingInterceptor } from './core/logging.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/ace-of-bids/browser'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: process.env.EMAIL,
      defaults: {
        from: '"Ace of Bids" <no-reply@aceofbids>',
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
