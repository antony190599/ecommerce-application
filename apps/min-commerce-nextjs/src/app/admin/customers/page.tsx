// filepath: c:\Users\jdies\dev\antony190599\ecommerce-application\apps\min-commerce-nextjs\src\app\admin\customers\page.tsx
"use client";

import { useState } from "react";
import useSWR from "swr";
import AdminLayout from "@/layouts/admin";
import { DataTable } from "../products/data-table"; // Reutiliza el componente de tabla
import { Customer, columns } from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { fetcher } from "@/utils/fetcher";


export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Use SWR for data fetching
  const { data, error, isLoading } = useSWR<any>('/api/admin/customers', fetcher);

  // Filtrar clientes basados en el término de búsqueda
  const filteredData = (data?.data || []).filter((customer: Customer) => {
    return (
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">
            Administra la información de clientes
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Cargando clientes...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Error al cargar clientes: {error.message}</p>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredData} />
      )}
    </AdminLayout>
  );
}