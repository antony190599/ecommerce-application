"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";
import { ProductProps } from "@/lib/types";

const getStatusBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Sin stock</Badge>;
    } else if (stock < 20) {
      return <Badge variant="secondary">Bajo stock</Badge>;
    } else {
      return <Badge variant="outline">En stock</Badge>;
    }
  };

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<ProductProps>[] = [
    {
        accessorKey: "imageUrl",
        header: "Imagen",
        cell: ({ row }) => (
        <img
            src={row.getValue("imageUrl") as string}
            alt={row.getValue("name") as string}
            className="w-16 h-16 object-cover rounded"
        />
        ),
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    // {
    //     accessorKey: "slug",
    //     header: "Slug",
    // },
    // {
    //     accessorKey: "unit",
    //     header: "Unidad",
    // },
    // {
    //     accessorKey: "meta",
    //     header: "Meta",
    // },
    {
        accessorKey: "price",
        header: "Precio",
    },
    {
        accessorKey: "discountPrice",
        header: "Precio con Descuento",
    },
    // {
    //     accessorKey: "isOnSale",
    //     header: "En Oferta",
    //     cell: ({ row }) => (
    //     <Badge variant={row.getValue("isOnSale") ? "default" : "outline"}>
    //         {row.getValue("isOnSale") ? "Sí" : "No"}
    //     </Badge>
    //     ),
    // },
    {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => getStatusBadge(row.getValue("stock")),
    },
    {
        accessorKey: "rating",
        header: "Calificación",
    },
    {
        accessorKey: "createdAt",
        header: "Creado el",
    },
    // {
    //     accessorKey: "updatedAt",
    //     header: "Actualizado el",
    // },
    
]