import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  postProduct(@Body() productDto: ProductDto) {
    return this.productService.createProduct(productDto);
  }

  @Get()
  getProducts() {
    return this.productService.retrieveProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.retrieveProduct(id);
  }

  @Put(':id')
  putProduct(@Param('id') id: string, @Body() productDto: ProductDto) {
    return this.productService.updateProduct(id, productDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
