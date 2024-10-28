"use client";

import React, { useState, useEffect } from "react";

import { Sales } from "@prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const SalesDataTable = () => {
  const [salesData, setSalesData] = useState<Sales[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      setIsLoading(true);
      const response = await fetch("/api/sales");
      const data = await response.json();
      setSalesData(data);
      setIsLoading(false);
    };
    fetchSales();
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={salesData} />
    </div>
  );
};

export default SalesDataTable;
