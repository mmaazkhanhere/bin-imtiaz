"use client";
import React from "react";

import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";

import { Sales } from "@prisma/client";

import { ArrowUpDown } from "lucide-react";
import { formatDate } from "@/helpers/formatDate";
import EditSales from "@/components/edit-sales";
import DeleteSales from "@/components/delete-sales";

export const columns = (refreshSales: () => void): ColumnDef<Sales>[] => [
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
          Price Sold
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "profit",
    header: "Profit",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          aria-label="quantity column button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right"
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("quantity"));
      return <div className="text-center">{quantity}</div>;
    },
  },
  {
    accessorKey: "seller",
    header: ({ column }) => {
      return (
        <Button
          aria-label="seller column button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Seller
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
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
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          aria-label="date column button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue<string>("date");
      return <div>{formatDate(date)}</div>;
    },
  },
  {
    id: "actionButtons",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4">
          <EditSales
          // inventoryId={row.original.id}
          // onEditSuccess={refreshData}
          // initialData={row.original as any}
          />
          <DeleteSales
            saleId={row.original.id}
            onDeleteSuccess={refreshSales}

            // inventoryId={row.original.id}
            // onDeleteSuccess={refreshData}
          />
        </div>
      );
    },
  },
];
