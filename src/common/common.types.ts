import { EnumProductPageMode } from "./common.enums";

export interface ProductDto {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  category?: CategoryDto;
}

export interface CategoryDto {
  id: number;
  name: string;
  products: null[];
}

export interface SelectDto {
  value: number;
  label: string;
}

export interface ProductPageResponseType {
  categories: SelectDto[];
  product?: ProductDto | undefined | null;
}

export interface ProductPageState extends ProductPageResponseType {
  mode: EnumProductPageMode;
}

export interface ProductPageParameterType {
  productId?: number | null;
  prevLocation?: string | null;
}

export interface ProductListResopnseType {
  products: ProductDto[];
  categories: SelectDto[];
}
