"use client";

import React, { useState, useEffect } from "react";

import { Inventory } from "@prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const InventoryDataTable = () => {
  const [inventoryData, setInventoryData] = useState<Inventory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      setIsLoading(true);
      const response = await fetch("/api/inventory");
      const data = await response.json();
      setInventoryData(data);
      setIsLoading(false);
    };
    fetchInventory();
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={inventoryData} />
    </div>
  );
};

export default InventoryDataTable;
