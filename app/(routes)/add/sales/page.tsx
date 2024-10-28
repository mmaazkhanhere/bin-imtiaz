import React from "react";
import { auth } from "@clerk/nextjs/server";

import AddSalesForm from "./_components/add_sales_form";

import { isAdmin } from "@/helpers/user-check";

const SalesPage = () => {
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
    <div>
      <h1 className="py-8 text-2xl font-bold text-center">Add Sales</h1>
      <AddSalesForm />
    </div>
  );
};

export default SalesPage;
