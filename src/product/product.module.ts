import { Module } from '@nestjs/common';

import { FirebaseModule } from '../firebase/firebase.module';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [FirebaseModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}