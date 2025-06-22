"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define el tipo de datos para los clientes
export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  direccion: string | null;
  referencia: string | null;
  needInvoice: boolean;
  paymentMethod: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "direccion",
    header: "Dirección",
    cell: ({ row }) => {
      const direccion = row.getValue("direccion") as string | null;
      return <span>{direccion || 'No disponible'}</span>;
    },
  },
  {
    accessorKey: "needInvoice",
    header: "Requiere factura",
    cell: ({ row }) => {
      const needInvoice = row.getValue("needInvoice") as boolean;
      return (
        <Badge variant={needInvoice ? "default" : "outline"}>
          {needInvoice ? "Sí" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Creado el",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const customer = row.original;

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(customer.id)}>
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem>Ver detalle</DropdownMenuItem>
            <DropdownMenuItem>Editar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];