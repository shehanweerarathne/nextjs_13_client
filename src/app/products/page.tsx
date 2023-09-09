import { ProductListResopnseType } from "@/common/common.types";
import ProductsGrid from "@/components/ProductsGrid";

async function getProductsAsync(): Promise<ProductListResopnseType> {
  try {
    const response = await fetch(
      `http://localhost:5118/api/Product/GetProducts`
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
export default async function Products() {
  const productsData: ProductListResopnseType = await getProductsAsync();
  return (
    <main>
      <h1>ProductsPage</h1>
      <ProductsGrid gridData={productsData} />
    </main>
  );
}
