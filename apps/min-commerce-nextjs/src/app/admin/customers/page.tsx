// filepath: c:\Users\jdies\dev\antony190599\ecommerce-application\apps\min-commerce-nextjs\src\app\admin\customers\page.tsx
"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/layouts/admin";
import { DataTable } from "../products/data-table"; // Reutiliza el componente de tabla
import { Customer, columns } from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

export default function CustomersPage() {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch("/api/admin/customers");
        if (!response.ok) {
          throw new Error("Error fetching customers");
        }
        const responseData = await response.json();
        setData(responseData.data);
      } catch (error) {
        console.error("Error loading customers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  // Filtrar clientes basados en el término de búsqueda
  const filteredData = data.filter((customer) => {
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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Cargando clientes...</p>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredData} />
      )}
    </AdminLayout>
  );
}