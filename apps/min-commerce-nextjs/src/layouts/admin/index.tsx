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
    Link,
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