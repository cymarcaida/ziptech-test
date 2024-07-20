import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  createProduct(): string {
    return 'Hello World!';
  }

  retrieveProducts(): string {
    return 'Hello World!';
  }

  retrieveProduct(): string {
    return 'Hello World!';
  }

  updateProduct(): string {
    return 'Hello World!';
  }

  deleteProduct(): string {
    return 'Hello World!';
  }
}
