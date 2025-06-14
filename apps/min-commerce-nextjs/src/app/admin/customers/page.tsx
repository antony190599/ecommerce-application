"use client";
import AdminLayout from "@/layouts/admin";


export default function CustomersPage() {

  return (
    <AdminLayout>
        <div className="flex flex-col justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Customers</h1>
            <p className="text-gray-600">Manage your customers here.</p>
        </div>
    </AdminLayout>
  );
}