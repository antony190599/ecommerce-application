"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Package2Icon,
  UsersIcon,
  ShoppingCartIcon,
  SettingsIcon,
  TagIcon,
  SearchIcon,
  PlusIcon,
} from "lucide-react";
import { DataTable } from "./data-table";
import { columns, Product } from "./columns";

function getData(): Array<Product> {
    // Fetch data from your API here.
    return [
        {
          id: "1",
          name: "Cuaderno Premium",
          category: "Papelería",
          price: 19.99,
          stock: 32,
          status: "active",
        },
        {
          id: "2",
          name: "Lápices de Colores 24 unid.",
          category: "Arte",
          price: 14.50,
          stock: 48,
          status: "active",
        },
        {
          id: "3",
          name: "Borrador Perfumado",
          category: "Papelería",
          price: 2.99,
          stock: 120,
          status: "active",
        },
        {
          id: "4",
          name: "Marcador permanente",
          category: "Escritura",
          price: 3.75,
          stock: 85,
          status: "active",
        },
        {
          id: "5",
          name: "Calculadora Científica",
          category: "Electrónicos",
          price: 35.99,
          stock: 18,
          status: "low_stock",
        },
        {
          id: "6",
          name: "Agenda 2023",
          category: "Organización",
          price: 12.50,
          stock: 0,
          status: "out_of_stock",
        },
        {
          id: "7",
          name: "Mochila Escolar",
          category: "Mochilas",
          price: 45.00,
          stock: 24,
          status: "active",
        },
      ];
  }

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search term
  const filteredProducts = (getData()).filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get badge color based on product status
  

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-xl font-semibold px-4 py-2">Admin Panel</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>General</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={true}>
                      <Package2Icon className="mr-2" />
                      <span>Productos</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <TagIcon className="mr-2" />
                      <span>Categorías</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <UsersIcon className="mr-2" />
                      <span>Clientes</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <ShoppingCartIcon className="mr-2" />
                      <span>Pedidos</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Configuración</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <SettingsIcon className="mr-2" />
                      <span>Ajustes</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <p className="text-xs text-muted-foreground px-4 py-2">
              Min-Commerce Admin v1.0
            </p>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto p-6">
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
        </div>
      </div>
    </SidebarProvider>
  );
}
