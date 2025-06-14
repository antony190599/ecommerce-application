"use client";
import AdminLayout from "@/layouts/admin";


export default function SettingPage() {

  return (
    <AdminLayout>
        <div className="flex flex-col justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p className="text-gray-600">Manage your store settings here.</p>
            
        </div>
    </AdminLayout>
  );
}