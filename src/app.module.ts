import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [ConfigModule.forRoot({ cache: true }), AuthModule, AccountModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
