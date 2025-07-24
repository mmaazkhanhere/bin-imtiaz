import React from "react";
import { auth } from "@clerk/nextjs/server";

import SalesDataTable from "./_components/sale-data-table";

import { isAdmin } from "@/helpers/user-check";

const SalesDetail = () => {
  const user = auth();
  const authorized = isAdmin(user.userId as string);

  if (!authorized)
    return (
      <main>
        <h1 className="text-2xl font-bold pt-4">
          You are not authorized to view this page.
        </h1>
      </main>
    );

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
