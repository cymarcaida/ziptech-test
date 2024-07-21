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
      secret: "1df7ca444b37b2cf9d286e5ffc1e5c81ab448cc7a8ef0e2651e3ca8b27cc5ee609be363cb9588cbd7bf7887e41e8890414a85cbda732db961b0950fd85ed0f4a",
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule { }