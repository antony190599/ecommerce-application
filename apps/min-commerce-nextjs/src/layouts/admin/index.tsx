"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
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
    HomeIcon,
  } from "lucide-react";
import { usePathname } from "next/navigation";

function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Function to check if the current path matches the given route
  const isActivePath = (path: string): boolean => {
    // Exact match for dashboard
    if (path === "/admin" && pathname === "/admin") {
      return true;
    }
    // For other routes, check if pathname starts with the path
    // This ensures subpages like /admin/products/edit are also highlighted
    return path !== "/admin" && pathname.startsWith(path);
  };

  return (
    <SidebarProvider 
        defaultOpen={true}
        style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
    >
      <Sidebar collapsible="offcanvas" variant="inset">
        <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold text-primary">Admin Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>General</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isActivePath("/admin")} asChild>
                    <a href="/admin">
                        <HomeIcon className="mr-2" />
                        <span>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isActivePath("/admin/products")} asChild>
                    <a href="/admin/products">
                      <Package2Icon className="mr-2" />
                      <span>Productos</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isActivePath("/admin/categories")} asChild>
                    <a href="/admin/categories">
                      <TagIcon className="mr-2" />
                      <span>Categorías</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isActivePath("/admin/customers")} asChild>
                    <a href="/admin/customers">
                      <UsersIcon className="mr-2" />
                      <span>Clientes</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isActivePath("/admin/orders")} asChild>
                    <a href="/admin/orders">
                      <ShoppingCartIcon className="mr-2" />
                      <span>Pedidos</span>
                    </a>
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
                  <SidebarMenuButton isActive={isActivePath("/admin/settings")} asChild>
                    <a href="/admin/settings">
                      <SettingsIcon className="mr-2" />
                      <span>Ajustes</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarMenuButton asChild className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100">
          <a href="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-4 w-4">
              <path d="M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24.99.38 1.96 1.35 2.23.33.09.68.18.96.18h.1C5.32 12.58 6.87 14 9 14c2.12 0 3.68-1.41 4.48-2.69h.02c.8 1.28 2.36 2.69 4.48 2.69 2.13 0 3.68-1.41 4.48-2.69h.1c.28 0 .63-.09.96-.18.98-.27 1.6-1.24 1.36-2.24zM7.5 14c-.83 0-1.5-.67-1.5-1.5S6.67 11 7.5 11s1.5.67 1.5 1.5S8.33 14 7.5 14zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
            <span>Ir a Tienda</span>
          </a>
        </SidebarMenuButton>
        <SidebarFooter>
          <p className="text-xs text-muted-foreground px-4 py-2">
            Min-Commerce Admin v1.0
          </p>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <div className="m-4">
            {children}
        </div>
      </SidebarInset>
  </SidebarProvider>
  );
}

export default AdminLayout;