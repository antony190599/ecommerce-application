"use client";
import React, { useState } from "react";
import AdminLayout from "@/layouts/admin";
import ProductsPageContent from "./products-page-content";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { ProductProps } from "@/lib/types";

export default function AdminProductsPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: productResult, isLoading } = useSWR<{
    data: ProductProps[];
    summary: {
      total: number,
      page: number,
      limit: number,
      totalPages: number
    }
  }>(
    `/api/admin/products?page=${pageIndex + 1}&limit=${pageSize}${searchTerm ? `&searchTerm=${encodeURIComponent(searchTerm)}` : ''}`,
    fetcher,
  );
  
  return (
    <AdminLayout>
        <ProductsPageContent
          initialProducts={productResult?.data || []}
          paginationSummary={productResult?.summary}
          isLoading={isLoading}
          pageIndex={pageIndex}
          pageSize={pageSize}
          searchTerm={searchTerm}
          onPageChange={setPageIndex}
          onPageSizeChange={setPageSize}
          onSearchChange={setSearchTerm}
        />
    </AdminLayout>
  );
}
