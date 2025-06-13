"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Package2Icon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  BarChart4Icon,
  AlertTriangleIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import AdminLayout from "@/layouts/admin";

// Sample product stats - this would typically come from an API
const productStats = {
  totalProducts: 156,
  activeProducts: 128,
  outOfStockProducts: 13,
  lowStockProducts: 15,
  topSellingCategories: [
    { name: "Papelería", percentage: 40 },
    { name: "Arte", percentage: 25 },
    { name: "Mochilas", percentage: 15 },
    { name: "Escritura", percentage: 12 },
    { name: "Otros", percentage: 8 },
  ],
  recentActivity: [
    {
      id: "7",
      name: "Mochila Escolar",
      action: "stock_updated",
      date: "2023-06-15",
      change: "+5",
    },
    {
      id: "5",
      name: "Calculadora Científica",
      action: "price_updated",
      date: "2023-06-14",
      change: "-S/5.00",
    },
    {
      id: "2",
      name: "Lápices de Colores 24 unid.",
      action: "added",
      date: "2023-06-12",
      change: "new",
    },
    {
      id: "6",
      name: "Agenda 2023",
      action: "out_of_stock",
      date: "2023-06-10",
      change: "0",
    },
  ],
  salesTrend: {
    increase: true,
    percentage: 12,
  },
  inventoryValue: {
    total: "S/ 12,450.00",
    change: "+5%",
    increase: true,
  },
};

export default function AdminPage() {

  return (
    <AdminLayout>
        <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Dashboard de Productos</h1>
              <p className="text-muted-foreground">
                Resumen y estadísticas de tu catálogo de productos
              </p>
            </div>

            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Productos
                </CardTitle>
                <Package2Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {productStats.totalProducts}
                </div>
                <p className="text-xs text-muted-foreground">
                  Productos en catálogo
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Productos Activos
                </CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {productStats.activeProducts}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round(
                    (productStats.activeProducts / productStats.totalProducts) *
                      100
                  )}
                  % del catálogo
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Sin Stock</CardTitle>
                <AlertTriangleIcon className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {productStats.outOfStockProducts}
                </div>
                <p className="text-xs text-muted-foreground">
                  Requieren reposición
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Valor Inventario</CardTitle>
                <BarChart4Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {productStats.inventoryValue.total}
                </div>
                <div className="flex items-center space-x-1">
                  {productStats.inventoryValue.increase ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-500" />
                  )}
                  <p
                    className={`text-xs ${
                      productStats.inventoryValue.increase
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {productStats.inventoryValue.change} desde último mes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7 mb-6">
            {/* Category Distribution */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Distribución por Categorías</CardTitle>
                <CardDescription>
                  Las categorías más populares en tu inventario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productStats.topSellingCategories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {category.percentage}%
                        </span>
                      </div>
                      <Progress value={category.percentage} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>
                  Cambios recientes en tus productos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productStats.recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium">{activity.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.date}
                        </p>
                      </div>
                      <Badge
                        variant={
                          activity.action === "out_of_stock"
                            ? "destructive"
                            : activity.action === "added"
                            ? "default"
                            : "outline"
                        }
                      >
                        {activity.action === "stock_updated"
                          ? "Stock actualizado"
                          : activity.action === "price_updated"
                          ? "Precio actualizado"
                          : activity.action === "added"
                          ? "Nuevo producto"
                          : "Sin stock"}
                        {activity.change !== "new" && ` (${activity.change})`}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stock Alert */}
          <Card>
            <CardHeader>
              <CardTitle>Alerta de Stock</CardTitle>
              <CardDescription>
                Productos con bajo stock que pueden requerir reposición
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">
                        {i === 0
                          ? "Agenda 2023"
                          : i === 1
                          ? "Calculadora Científica"
                          : i === 2
                          ? "Lápices de Tinta Gel"
                          : i === 3
                          ? "Carpetas de Presentación"
                          : "Cuaderno de Dibujo Profesional"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {i === 0
                          ? "Organización"
                          : i === 1
                          ? "Electrónicos"
                          : i === 2
                          ? "Escritura"
                          : i === 3
                          ? "Oficina"
                          : "Arte"}
                      </p>
                    </div>
                    <Badge variant={i === 0 ? "destructive" : "secondary"}>
                      {i === 0
                        ? "0 unidades"
                        : i === 1
                        ? "18 unidades"
                        : i === 2
                        ? "12 unidades"
                        : i === 3
                        ? "15 unidades"
                        : "10 unidades"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
    </AdminLayout>
  );
}
