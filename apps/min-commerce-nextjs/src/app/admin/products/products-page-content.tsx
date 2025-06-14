"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, PlusIcon } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ProductProps } from "@/lib/types";

interface ProductsPageContentProps {
  initialProducts: ProductProps[];
}

export default function ProductsPageContent({ initialProducts }: ProductsPageContentProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return initialProducts;
    }

    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    
    return initialProducts.filter((product) => 
      product.name.toLowerCase().includes(lowerSearchTerm) ||
      product.category.toLowerCase().includes(lowerSearchTerm) ||
      product.slug.toLowerCase().includes(lowerSearchTerm)
    );
  }, [initialProducts, searchTerm]);

  console.log("Filtered Products:", filteredProducts);

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Filtros</Button>
      </div>

      <div className="rounded-md border">
        <DataTable columns={columns} data={filteredProducts} />
      </div>
    </>
  );
}