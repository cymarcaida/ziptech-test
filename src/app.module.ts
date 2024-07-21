import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot({ cache: true }), ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
