import { NextResponse } from "next/server";
import { parse, format } from "date-fns";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

import { isAdmin } from "@/helpers/user-check";

export const GET = async () => {
  try {
    const { userId } = auth();
    const authorized = isAdmin(userId as string);

    if (!authorized) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const metrics = await prismadb.monthlyMetrics.findMany({
      orderBy: {
        month: "asc",
      },
    });

    const chartData = metrics.map((metric) => {
      const date = parse(`${metric.month}-01`, "yyyy-MM-dd", new Date());

      const formattedMonth = format(date, "MMM yyyy");

      return {
        month: formattedMonth,
        sales: metric.totalRevenue,
      };
    });

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Error fetching monthly sales:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
