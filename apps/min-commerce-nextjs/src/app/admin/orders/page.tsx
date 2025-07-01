"use client";
import React, { useState } from "react";
import AdminLayout from "@/layouts/admin";
import OrdersPageContent from "./orders-page-content";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { OrdersProps } from "@/lib/types";

export default function AdminProductsPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: orderResult, isLoading } = useSWR<{
    data: OrdersProps[];
    summary: {
      total: number,
      page: number,
      limit: number,
      totalPages: number
    }
  }>(
    `/api/admin/orders?page=${pageIndex + 1}&limit=${pageSize}${searchTerm ? `&searchTerm=${encodeURIComponent(searchTerm)}` : ''}`,
    fetcher,
  );
  
  return (
    <AdminLayout>
        <OrdersPageContent
          initialOrders={orderResult?.data || []}
          paginationSummary={orderResult?.summary}
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
