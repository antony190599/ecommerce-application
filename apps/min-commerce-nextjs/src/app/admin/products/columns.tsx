"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";
import { ProductProps } from "@/lib/types";
import { MoreHorizontal, Edit, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

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
            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
        />
        ),
    },
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <span className="font-medium">{row.getValue("name")}</span>
              <span className="text-xs text-muted-foreground sm:hidden">
                ${row.getValue("price")} • {getStatusBadge(row.getValue("stock"))}
              </span>
            </div>
          )
        }
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
        cell: ({ row }) => {
          const price = parseFloat(row.getValue("price"));
          return <span>${price.toFixed(2)}</span>;
        }
    },
    // {
    //     accessorKey: "discountPrice",
    //     header: "Precio c/ desc",
    //     cell: ({ row }) => {
    //       const price = parseFloat(row.getValue("discountPrice"));
    //       return price > 0 ? <span>${price.toFixed(2)}</span> : <span>-</span>;
    //     }
    // },
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
        cell: ({ row }) => {
          const rating = parseFloat(row.getValue("rating"));
          return <span>{rating > 0 ? `${rating.toFixed(1)}★` : '-'}</span>;
        }
    },
    {
        accessorKey: "createdAt",
        header: "Creado el",
        cell: ({ row }) => {
          const date = new Date(row.getValue("createdAt"));
          return <span>{date.toLocaleDateString()}</span>
        }
    },
    // {
    //     accessorKey: "updatedAt",
    //     header: "Actualizado el",
    // },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const product = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product.id)}
              >
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash className="mr-2 h-4 w-4" /> Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
]