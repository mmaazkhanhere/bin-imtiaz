"use client"
import React from 'react'

import { Button } from '@/components/ui/button'

import { ColumnDef } from "@tanstack/react-table"
import { Sales } from '@/types/interface'

import { ArrowUpDown } from "lucide-react";


export const columns: ColumnDef<Sales>[] = [
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
        accessorKey: "quantity",
        header: ({ column }) => {
            return (
                <Button
                    aria-label="quantity column button"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Quantity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "seller",
        header: ({ column }) => {
            return (
                <Button
                    aria-label="seller column button"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
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
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
]
