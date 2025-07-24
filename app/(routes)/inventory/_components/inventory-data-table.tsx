"use client";

import React, { useState, useEffect, useCallback } from "react";

import { Inventory } from "@prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const InventoryDataTable = () => {
  const [inventoryData, setInventoryData] = useState<Inventory[]>([]);
  const [, setIsLoading] = useState(true);

  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/inventory");
      const data = await response.json();
      setInventoryData(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  console.log(inventoryData);

  return (
    <div>
      <DataTable columns={columns(fetchInventory)} data={inventoryData} />
    </div>
  );
};

export default InventoryDataTable;
