"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";

const getStatusBadge = (status: string, stock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return <Badge variant="destructive">Sin stock</Badge>;
    } else if (status === "low_stock" || stock < 20) {
      return <Badge variant="secondary">Bajo stock</Badge>;
    } else {
      return <Badge variant="outline">En stock</Badge>;
    }
  };

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: "active" | "low_stock" | "out_of_stock";
}


export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "ID",
        
    },
    {
        accessorKey: "name",
        header: "Nombre del Producto",
        
    },
    {
        accessorKey: "category",
        header: "Categoría",
        
    },
    {
        accessorKey: "price",
        header: "Precio",
        
    },
    {
        accessorKey: "stock",
        header: "Stock",
        
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const stock = row.getValue("stock") as number;
            return getStatusBadge(status, stock);
        },
    },
]