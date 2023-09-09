"use client";
import { EnumProductPageMode } from "@/common/common.enums";
import { ProductDto, ProductPageResponseType } from "@/common/common.types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, startTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  FormGroup,
  FormControl,
  TextField,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import {
  createProductAsync,
  deleteProductAsync,
  updateProductAsync,
} from "@/common/actions/products.api";

interface ProductFormProps {
  inputData: ProductPageResponseType;
}

const productFormSchema = yup.object().shape({
  name: yup.string().required("First Name is required"),
  price: yup
    .number()
    .moreThan(0, "price must be greater than 0")
    .required("price is required"),
  categoryId: yup
    .number()
    .moreThan(0, "category is required")
    .required("category is required"),
});

export default function ProductForm({ inputData }: ProductFormProps) {
  const [pageMode, setPageMode] = useState<EnumProductPageMode>(
    EnumProductPageMode.View
  ); // [1
  const hookForm = useForm({
    resolver: yupResolver(productFormSchema),
  });
  const router = useRouter();
  useEffect(() => {
    if (inputData.product) {
      hookForm.setValue("name", inputData.product.name);
      hookForm.setValue("price", inputData.product.price);
      hookForm.setValue("categoryId", inputData.product.categoryId);
      if (inputData.product.id === 0) {
        setPageMode(EnumProductPageMode.Create);
      }
    }
  }, [inputData.product]);

  function onFormSubmit(data: any) {
    const product: ProductDto = {
      id: inputData.product?.id ?? 0,
      name: data.name,
      price: data.price,
      categoryId: data.categoryId,
    };
    if (pageMode === EnumProductPageMode.Create) {
      startTransition(() => {
        createProductAsync(product).then((x) => {
          router.push(`/products/${x.product?.id}`);
        });
      });
    } else if (pageMode === EnumProductPageMode.Edit) {
      updateProductAsync(product).then((x) => {
        router.push(`/products/${x.product?.id}`);
        setPageMode(EnumProductPageMode.View);
      });
    }
  }

  function onClickDelete() {
    startTransition(() => {
      deleteProductAsync(inputData.product?.id ?? 0).then(() => {
        router.push(`/products`);
      });
    });
  }

  return (
    <form onSubmit={hookForm.handleSubmit(onFormSubmit)}>
      <Controller
        name="name"
        control={hookForm.control}
        defaultValue={inputData.product?.name ?? ""}
        render={({ field, fieldState }) => (
          <FormGroup>
            <FormControl>
              <TextField
                id="name"
                label="Product name"
                disabled={pageMode === EnumProductPageMode.View}
                error={fieldState.invalid}
                {...field}
              />
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
          </FormGroup>
        )}
      />
      <br />
      <Controller
        name="price"
        control={hookForm.control}
        defaultValue={inputData.product?.price ?? 0}
        render={({ field, fieldState }) => (
          <FormGroup>
            <FormControl>
              <TextField
                id="price"
                label="Product price"
                disabled={pageMode === EnumProductPageMode.View}
                type="number"
                error={fieldState.invalid}
                {...field}
              />
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
          </FormGroup>
        )}
      />
      <br />
      <Controller
        name="categoryId"
        control={hookForm.control}
        defaultValue={inputData.product?.categoryId ?? 0}
        render={({ field, fieldState }) => (
          <FormGroup>
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Product category
              </InputLabel>
              <Select
                id="categoryId"
                label="Product category"
                disabled={pageMode === EnumProductPageMode.View}
                error={fieldState.invalid}
                {...field}
              >
                {inputData.categories.map((category, index) => (
                  <MenuItem key={index} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
          </FormGroup>
        )}
      />
      <br />
      {pageMode === EnumProductPageMode.Create && (
        <Button
          variant="contained"
          color="error"
          onClick={() => hookForm.reset()}
          sx={{ marginRight: 2 }}
        >
          Clear
        </Button>
      )}
      {(pageMode === EnumProductPageMode.Create ||
        pageMode === EnumProductPageMode.Edit) && (
        <Button variant="contained" color="success" type="submit">
          Save
        </Button>
      )}
      {pageMode === EnumProductPageMode.View && (
        <>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              setPageMode(EnumProductPageMode.Edit);
            }}
            sx={{ marginRight: 2 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onClickDelete}
            sx={{ marginRight: 2 }}
          >
            Delete
          </Button>
        </>
      )}
    </form>
  );
}
