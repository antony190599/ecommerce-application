"use client";
import AdminLayout from "@/layouts/admin";


export default function CategoriesPage() {

  return (
    <AdminLayout>
        <div className="flex flex-col justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Categories</h1>
            <p className="text-gray-600">Manage your product categories here.</p>
        </div>
    </AdminLayout>
  );
}