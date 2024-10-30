"use client";
import React from "react";

import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Inventory, InventorySize } from "@prisma/client";
import { formatDate } from "@/helpers/formatDate";

type InventoryColumns = Inventory & {
  sizes: InventorySize[];
};

export const columns: ColumnDef<InventoryColumns>[] = [
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          aria-label="product name column button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.getValue<string>("productName");
      return <div className="lg:pl-4">{product}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          aria-label="price column button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "sizes",
    header: "Sizes (cm)",
    cell: ({ row }) => {
      const sizes = row.original.sizes;
      return (
        <div>
          {sizes.map((size: InventorySize) => (
            <div key={size.id} className="py-1">
              <span>{size.size}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  ...[
    {
      id: "totalStock",
      header: "Total Stock",
      cell: ({ row }: any) => {
        const sizes = row.original.sizes;
        return (
          <div>
            {sizes.map((size: InventorySize) => (
              <div key={size.id} className="py-1">
                {size.stock}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      id: "availableStock",
      header: "Available Stock",
      cell: ({ row }: any) => {
        const sizes = row.original.sizes;
        return (
          <div>
            {sizes.map((size: InventorySize) => (
              <div key={size.id} className="py-1">
                {size.stockAvailable}
              </div>
            ))}
          </div>
        );
      },
    },
  ],
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          aria-label="created at column button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue<string>("createdAt");
      return <div>{formatDate(date)}</div>;
    },
  },
];
