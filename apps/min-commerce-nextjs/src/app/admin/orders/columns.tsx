"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";
import { OrdersProps } from "@/lib/types";
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


export const columns: ColumnDef<OrdersProps>[] = [
  {
    accessorKey: "customerName",
    header: "Nombre del cliente",
  },
  {
    accessorKey: "customerEmail",
    header: "Email del cliente",
  },
  {
    accessorKey: "customerPhone",
    header: "Teléfono del cliente",
  },
  /*
  {
    accessorKey: "needInvoice",
    header: "Factura",
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pago",
  },
  */
  {
    accessorKey: "direccion",
    header: "Dirección",
  },
  /*
  {
    accessorKey: "referencia",
    header: "Referencia",
  },
  */
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return <Badge variant={status === "pending" ? "default" : "outline"}>{status as string}</Badge>;
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