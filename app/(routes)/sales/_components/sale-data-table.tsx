"use client";

import React, { useState, useEffect, useCallback } from "react";

import { Sales } from "@prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SalesDataTable = () => {
  const [salesData, setSalesData] = useState<Sales[]>([]);
  const [, setIsLoading] = useState(true);

  const fetchSales = useCallback(async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const response = await fetch("/api/sales");
      const data = await response.json();
      setSalesData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  return (
    <div>
      <Link href="/add/sales">
        <Button className="mb:5 md:mb-7 lg:mb-10">Add Sale</Button>
      </Link>
      <DataTable columns={columns(fetchSales)} data={salesData} />
    </div>
  );
};

export default SalesDataTable;
