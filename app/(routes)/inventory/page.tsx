import React from "react";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import InventoryDataTable from "./_components/inventory-data-table";

const InventoryDetailsPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold py-16 text-center">
        Inventory Details
      </h1>
      <InventoryDataTable />
    </div>
  );
};

export default InventoryDetailsPage;
