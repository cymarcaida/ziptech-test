import { Test, TestingModule } from '@nestjs/testing';

import { ProductRepository } from '../../src/firebase/product.repository';
import { ProductDto } from '../../src/product/dto/product.dto';
import { ProductType } from '../../src/product/enums/type.enum';
import { ProductService } from '../../src/product/product.service';

describe('ProductService', () => {
	let service: ProductService;
	let repository: ProductRepository;

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

	const mockItemsRepository = {
		create: jest.fn().mockResolvedValue(mockResponse),
		findAll: jest.fn().mockResolvedValue([mockResponse]),
		find: jest.fn().mockResolvedValue(mockResponse),
		update: jest.fn().mockResolvedValue(mockResponse),
		remove: jest.fn().mockResolvedValue({
			"message": "Product deleted successfully!"
		}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductService,
				{ provide: ProductRepository, useValue: mockItemsRepository },
			],
		}).compile();

		service = module.get<ProductService>(ProductService);
		repository = module.get<ProductRepository>(ProductRepository);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create a product', async () => {
		const result = await service.createProduct(mockRequest);
		expect(result).toEqual(mockResponse);
		expect(repository.create).toHaveBeenCalledWith(mockRequest);
	});

	it('should return all products', async () => {
		const result = await service.retrieveProducts();
		expect(result).toEqual([mockResponse]);
		expect(repository.findAll).toHaveBeenCalled();
	});

	it('should return a product', async () => {
		const result = await service.retrieveProduct(mockId);
		expect(result).toEqual(mockResponse);
		expect(repository.find).toHaveBeenCalledWith(mockId);
	});

	it('should update a product', async () => {
		const result = await service.updateProduct(mockId, mockRequest);
		expect(result).toEqual(mockResponse);
		expect(repository.update).toHaveBeenCalledWith(mockId, mockRequest);
	});

	it('should delete a product', async () => {
		const result = await service.deleteProduct(mockId);
		expect(result).toEqual({
			"message": "Product deleted successfully!"
		});
		expect(repository.remove).toHaveBeenCalledWith(mockId);
	});
});
