import React from "react";

import TotalRevenueMetrics from "./total-revenue-metrics";
import TotalSalesMetrics from "./total-sales";
import TopCategoryMetrics from "./top-category-metrics";
import TotalProfitMetrics from "./total-profit-metrics";

const Metrics = () => {
  return (
    <div className="grid grid-cols-4 gap-5 w-full">
      <TotalRevenueMetrics heading="Total Revenue" />

      <TotalSalesMetrics heading="Total Sales" />

      <TotalProfitMetrics heading="Total Profit" />

      <TopCategoryMetrics heading="Top Categroy" />
    </div>
  );
};

export default Metrics;
