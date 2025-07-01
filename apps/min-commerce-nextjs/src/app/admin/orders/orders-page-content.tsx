"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, PlusIcon, Loader2 } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { OrdersProps } from "@/lib/types";

interface PaginationSummary {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface OrdersPageContentProps {
  initialOrders: OrdersProps[];
  paginationSummary?: PaginationSummary;
  isLoading?: boolean;
  pageIndex?: number;
  pageSize?: number;
  searchTerm?: string;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSearchChange?: (term: string) => void;
}

export default function OrdersPageContent({ 
  initialOrders,
  paginationSummary,
  isLoading = false,
  pageIndex = 0,
  pageSize = 10,
  searchTerm = "",
  onPageChange,
  onPageSizeChange,
  onSearchChange,
}: OrdersPageContentProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Handle search with debounce
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    
    // Debounce the search to avoid unnecessary API calls
    if (onSearchChange) {
      const timeoutId = setTimeout(() => {
        onSearchChange(value);
        // Reset to page 1 when searching
        if (onPageChange) onPageChange(0);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Pedidos</h1>
          <p className="text-muted-foreground">
            Gestiona tus pedidos
          </p>
        </div>
        
      </div>

      <div className="flex items-center mb-4 gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pedidos por nombre del cliente..."
            className="pl-8"
            value={localSearchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline">Filtros</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <DataTable 
          columns={columns} 
          data={initialOrders} 
          pageCount={paginationSummary?.totalPages}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </>
  );
}