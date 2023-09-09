import { getProductByIdAsync } from "@/common/actions/products.api";
import { ProductPageResponseType } from "@/common/common.types";
import ProductForm from "@/components/ProductForm";

export default async function Product({ params }: { params: { id: string } }) {
  let inputData = {} as ProductPageResponseType;
  if (params.id === "new") {
    inputData = await getProductByIdAsync(0);
  } else {
    inputData = await getProductByIdAsync(parseInt(params.id));
  }
  return (
    <main>
      <h1>Product</h1>
      <ProductForm inputData={inputData} />
    </main>
  );
}
