"use client";
import { ProductListResopnseType } from "@/common/common.types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductsGridProps {
  gridData: ProductListResopnseType;
}

export default function ProductsGrid(props: ProductsGridProps) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product Name", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "category", headerName: "Category", width: 130 },
  ];

  interface RowType {
    id: number;
    name: string;
    price: number;
    category: string;
  }

  const [dataRows, setDataRows] = useState<RowType[]>([]);
  const router = useRouter();

  useEffect(() => {
    setDataRows(
      props.gridData.products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category?.name ?? "No Category",
        };
      })
    );
  }, [props.gridData]);
  return (
    <main>
      <DataGrid
        sx={{ height: 400, width: "100%" }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        rows={dataRows}
        columns={columns}
        onRowClick={(row) => router.push(`/products/${row.id}`)}
      />
    </main>
  );
}
