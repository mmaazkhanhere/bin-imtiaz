"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { Inventory } from "@prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";

const InventoryDataTable = () => {
  const [inventoryData, setInventoryData] = useState<Inventory[]>([]);
  const [, setIsLoading] = useState(true);
  const router = useRouter();

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
      <Button
        onClick={() => router.push("/add/inventory")}
        className="mb:5 md:mb-7 lg:mb-10"
      >
        Add Inventory
      </Button>
      <DataTable columns={columns(fetchInventory)} data={inventoryData} />
    </div>
  );
};

export default InventoryDataTable;
