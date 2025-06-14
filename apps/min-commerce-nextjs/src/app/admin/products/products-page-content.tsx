"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, PlusIcon, Loader2 } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ProductProps } from "@/lib/types";

interface PaginationSummary {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ProductsPageContentProps {
  initialProducts: ProductProps[];
  paginationSummary?: PaginationSummary;
  isLoading?: boolean;
  pageIndex?: number;
  pageSize?: number;
  searchTerm?: string;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSearchChange?: (term: string) => void;
}

export default function ProductsPageContent({ 
  initialProducts,
  paginationSummary,
  isLoading = false,
  pageIndex = 0,
  pageSize = 10,
  searchTerm = "",
  onPageChange,
  onPageSizeChange,
  onSearchChange,
}: ProductsPageContentProps) {
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
          <h1 className="text-2xl font-bold">Productos</h1>
          <p className="text-muted-foreground">
            Gestiona tu catálogo de productos
          </p>
        </div>
        
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <div className="flex items-center mb-4 gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos por nombre o categoría..."
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
          data={initialProducts} 
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