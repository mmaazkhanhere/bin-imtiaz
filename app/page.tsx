import DashboardUI from "@/components/dashboard/dashboard-ui";
import { isAdmin } from "@/helpers/user-check";
import { auth } from "@clerk/nextjs/server";

import React from "react";

const Home = () => {
  const user = auth();
  const authorized = isAdmin(user.userId as string);

  if (!authorized)
    return (
      <main>
        <h1 className="text-2xl font-bold">
          You are not authorized to view this page.
        </h1>
      </main>
    );

  return (
    <main>
      <DashboardUI />
    </main>
  );
};

export default Home;
