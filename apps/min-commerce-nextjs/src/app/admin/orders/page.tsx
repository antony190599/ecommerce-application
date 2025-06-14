"use client";
import AdminLayout from "@/layouts/admin";


export default function OrderPage() {

  return (
    <AdminLayout>
        <div className="flex flex-col justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <p className="text-gray-600">Manage your orders here.</p>
        </div>
    </AdminLayout>
  );
}