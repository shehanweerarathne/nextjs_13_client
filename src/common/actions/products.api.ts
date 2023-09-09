"use server";

import { revalidatePath } from "next/cache";
import {
  ProductDto,
  ProductListResopnseType,
  ProductPageResponseType,
} from "../common.types";

export async function getProductsAsync(): Promise<ProductListResopnseType> {
  try {
    const response = await fetch(
      `http://localhost:5118/api/Product/GetProducts`,
      { cache: "no-store" }
    );
    if (response.ok) {
      const products: ProductListResopnseType = await response.json();
      return products;
    } else {
      return { products: [], categories: [] } as ProductListResopnseType;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const baseUrl = "http://localhost:5118/api";

export async function getProductByIdAsync(
  productId: number
): Promise<ProductPageResponseType> {
  try {
    const response = await fetch(
      `${baseUrl}/Product/GetProductById/${productId}`,
      { cache: "no-store" }
    );
    const pageData: ProductPageResponseType = await response.json();
    return pageData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createProductAsync(
  product: ProductDto
): Promise<ProductPageResponseType> {
  try {
    const response = await fetch(`${baseUrl}/Product/CreateProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
      cache: "no-store",
    });
    const pageData: ProductPageResponseType = await response.json();
    revalidatePath(`/products`);
    return pageData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateProductAsync(
  product: ProductDto
): Promise<ProductPageResponseType> {
  try {
    const response = await fetch(`${baseUrl}/Product/UpdateProduct`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
      cache: "no-store",
    });
    const pageData: ProductPageResponseType = await response.json();
    revalidatePath(`/products/${pageData.product?.id}`);
    return pageData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteProductAsync(
  productId: number
): Promise<ProductPageResponseType> {
  try {
    const response = await fetch(
      `${baseUrl}/Product/DeleteProduct/${productId}`,
      {
        method: "DELETE",
        cache: "no-store",
      }
    );
    const pageData: ProductPageResponseType = await response.json();
    revalidatePath(`/products`);
    return pageData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
