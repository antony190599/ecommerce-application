"use client";
import React from "react";
import AdminLayout from "@/layouts/admin";
import ProductsPageContent from "./products-page-content";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { ProductProps } from "@/lib/types";

export default function AdminProductsPage() {
  const { data: productResult, isLoading } = useSWR<{
    data: ProductProps[];
    summary: {
      total: number,
      page: number,
      limit: number,
      totalPages: number
    }
  }>(
    "/api/admin/products",
    fetcher,
  );
  
  return (
    <AdminLayout>
        <ProductsPageContent
          initialProducts={productResult?.data || []}
        />
    </AdminLayout>
  );
}
