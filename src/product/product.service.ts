import { Injectable } from '@nestjs/common';

import { ProductDto } from './dto/product.dto';
import { ProductRepository } from 'src/firebase/product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) { }

  createProduct(productDto: ProductDto) {
    return this.productRepository.create(productDto);
  }

  retrieveProducts() {
    return this.productRepository.findAll();
  }

  retrieveProduct(id: string) {
    return this.productRepository.find(id);
  }

  updateProduct(id: string, productDto: ProductDto) {
    return this.productRepository.update(id, productDto);
  }

  deleteProduct(id: string) {
    return this.productRepository.remove(id);
  }
}
