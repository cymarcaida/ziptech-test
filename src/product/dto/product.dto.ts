// src/items/dto/create-item.dto.ts
import { IsString, IsInt, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { ProductType } from '../enums/type.enum';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsEnum(ProductType)
  @IsNotEmpty()
  readonly type?: ProductType;

  @IsInt()
  @IsNotEmpty()
  readonly quantity: number;

  @IsInt()
  @IsNotEmpty()
  readonly price?: number;

  @IsString()
  @IsOptional()
  readonly requirements?: string;
}