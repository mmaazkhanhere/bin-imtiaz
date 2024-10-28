"use client";
import React from "react";

import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Inventory } from "@prisma/client";

export const columns: ColumnDef<Inventory>[] = [
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
    accessorKey: "totalStock",
    header: "Total Stock",
  },
  {
    accessorKey: "stockAvailable",
    header: ({ column }) => {
      return (
        <Button
          aria-label="stock available column button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock Available
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const stock = row.getValue<number>("stockAvailable");
      return <div className="lg:pl-8">{stock}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
];
