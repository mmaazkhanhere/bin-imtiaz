import React from "react";

import SalesDataTable from "./_components/sale-data-table";

const SalesDetail = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold py-16 text-center">
        Sales Details
      </h1>
      <SalesDataTable />
    </div>
  );
};

export default SalesDetail;
