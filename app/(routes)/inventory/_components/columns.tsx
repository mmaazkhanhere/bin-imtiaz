"use client"
import React from 'react'

import { Button } from '@/components/ui/button'

import { ColumnDef } from "@tanstack/react-table"
import { Inventory } from '@/types/interface'

import { ArrowUpDown } from "lucide-react";


export const columns: ColumnDef<Inventory>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "productName",
      header: ({ column }) => {
        return (
            <Button
                aria-label="product name column button"
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
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
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
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
        accessorKey: "stock",
        header: ({ column }) => {
            return (
                <Button
                    aria-label="stock available column button"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Stock Available
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
]
