import React from "react";

import TotalRevenueMetrics from "./total-revenue-metrics";
import TotalSalesMetrics from "./total-sales";
import TopCategoryMetrics from "./top-category-metrics";
import InventoryLevelMetrics from "./inventory-level-metrics";

const Metrics = () => {
  return (
    <div className="grid grid-cols-4 gap-5 w-full">
      <TotalRevenueMetrics heading="Total Revenue" />

      <TotalSalesMetrics heading="Total Sales" />

      <TopCategoryMetrics
        heading="Top Categroy"
        category="Fleece"
        description="100 items sold last month"
      />

      <InventoryLevelMetrics
        heading="Inventory Level"
        items="500"
        description="Refill your inventory"
      />
    </div>
  );
};

export default Metrics;
