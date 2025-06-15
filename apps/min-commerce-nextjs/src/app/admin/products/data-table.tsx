"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount?: number
  pageIndex?: number
  pageSize?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount: controlledPageCount,
  pageIndex: controlledPageIndex = 0,
  pageSize: controlledPageSize = 10,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<TData, TValue>) {
  // State for column visibility
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  
  // Set initial column visibility based on screen size
  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 640; // sm breakpoint
      const isMedium = window.innerWidth >= 640 && window.innerWidth < 1024; // md breakpoint
      
      const newVisibility: VisibilityState = {};
      
      // Always show these columns
      newVisibility.name = true;
      newVisibility.imageUrl = true;
      
      // Show these columns on medium screens and larger
      newVisibility.price = !isSmall;
      newVisibility.stock = !isSmall;
      
      // Show these columns only on large screens
      newVisibility.discountPrice = !isSmall && !isMedium;
      newVisibility.rating = !isSmall && !isMedium;
      newVisibility.createdAt = !isSmall && !isMedium;
      
      setColumnVisibility(newVisibility);
    };
    
    // Initialize on load
    handleResize();
    
    // Update on resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: Boolean(onPageChange),
    pageCount: controlledPageCount,
    state: {
      pagination: {
        pageIndex: controlledPageIndex,
        pageSize: controlledPageSize,
      },
      columnVisibility,
    },
    onPaginationChange: (updater) => {
      if (!onPageChange || !onPageSizeChange) return;
      
      // Handle both function and value updates
      const newState = typeof updater === 'function' 
        ? updater({ pageIndex: controlledPageIndex, pageSize: controlledPageSize }) 
        : updater;
        
      if (newState.pageIndex !== controlledPageIndex) {
        onPageChange(newState.pageIndex);
      }
      if (newState.pageSize !== controlledPageSize) {
        onPageSizeChange(newState.pageSize);
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <div>
      <div className="rounded-md border overflow-hidden">
        <div className="">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Responsive Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {data.length > 0 && (
            <p className="text-xs sm:text-sm">
              Mostrando&nbsp;
              <strong>
                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
              </strong>
              &nbsp;a&nbsp;
              <strong>
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}
              </strong>
              &nbsp;de&nbsp;
              <strong>{table.getFilteredRowModel().rows.length}</strong>
              &nbsp;resultados
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium hidden sm:block">Filas por página</p>
            <p className="text-sm font-medium sm:hidden">Filas</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full sm:w-[100px] items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount() || 1}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden lg:flex h-8 w-8 p-0"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir a la primera página</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir a la página anterior</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir a la página siguiente</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden lg:flex h-8 w-8 p-0"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir a la última página</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}