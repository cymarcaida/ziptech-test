import { Test, TestingModule } from '@nestjs/testing';

import { ProductController } from '../../src/product/product.controller';
import { ProductService } from '../../src/product/product.service';
import { ProductDto } from '../../src/product/dto/product.dto';
import { ProductType } from '../../src/product/enums/type.enum';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockId = "testId"

  const mockRequest: ProductDto = {
    "quantity": 7,
    "price": 125,
    "name": "Test Product",
    "description": "Product to test",
    "type": ProductType.SPORTS
  }

  const mockResponse = {
    "id": mockId,
    "quantity": 7,
    "price": 125,
    "name": "Test Product",
    "description": "Product to test",
    "type": "sports"
  }

  const deleteResponse = {
    "message": "Product deleted successfully!"
  }

  const mockItemsService = {
    createProduct: jest.fn().mockResolvedValue(mockResponse),
    retrieveProducts: jest.fn().mockResolvedValue([mockResponse]),
    retrieveProduct: jest.fn().mockResolvedValue(mockResponse),
    updateProduct: jest.fn().mockResolvedValue(mockResponse),
    deleteProduct: jest.fn().mockResolvedValue(deleteResponse),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        { provide: ProductService, useValue: mockItemsService },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an item', async () => {
    const result = await controller.postProduct(mockRequest);
    expect(result).toEqual(mockResponse);
    expect(service.createProduct).toHaveBeenCalledWith(mockRequest);
  });

  it('should return all items', async () => {
    const result = await controller.getProducts();
    expect(result).toEqual([mockResponse]);
    expect(service.retrieveProducts).toHaveBeenCalled();
  });

  it('should return a single item', async () => {
    const result = await controller.getProduct(mockId);
    expect(result).toEqual(mockResponse);
    expect(service.retrieveProduct).toHaveBeenCalledWith(mockId);
  });

  it('should update an item', async () => {
    const result = await controller.putProduct(mockId, mockRequest);
    expect(result).toEqual(mockResponse);
    expect(service.updateProduct).toHaveBeenCalledWith(mockId, mockRequest);
  });

  it('should delete an item', async () => {
    const result = await controller.deleteProduct(mockId);
    expect(result).toEqual(deleteResponse)
    expect(service.deleteProduct).toHaveBeenCalledWith(mockId);
  });
});
