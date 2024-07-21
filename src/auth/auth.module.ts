import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { AccountModule } from 'src/account/account.module';


@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule { }