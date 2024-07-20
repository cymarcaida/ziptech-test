import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  postProduct(): string {
    return this.appService.createProduct();
  }

  @Get()
  getProducts(): string {
    return this.appService.retrieveProducts();
  }

  @Get()
  getProduct(): string {
    return this.appService.retrieveProduct();
  }

  @Put()
  putProduct(): string {
    return this.appService.updateProduct();
  }

  @Delete()
  deleteProduct(): string {
    return this.appService.deleteProduct();
  }
}
