import { Injectable } from '@nestjs/common';

import { FirebaseRepository } from '../firebase/firebase.repository';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private firebaseRepository: FirebaseRepository) { }

  createProduct(productDto: ProductDto) {
    return this.firebaseRepository.create(productDto);
  }

  retrieveProducts() {
    return this.firebaseRepository.findAll();
  }

  retrieveProduct(id: string) {
    return this.firebaseRepository.find(id);
  }

  updateProduct(id: string, productDto: ProductDto) {
    return this.firebaseRepository.update(id, productDto);
  }

  deleteProduct(id: string) {
    return this.firebaseRepository.remove(id);
  }
}
