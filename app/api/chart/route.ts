import { NextRequest, NextResponse } from "next/server";
import { parse, format } from "date-fns";

import prismadb from "@/lib/prismadb";

export const GET = async (request: NextRequest) => {
  try {
    // Fetch all monthly metrics, ordered by 'month' ascending
    const metrics = await prismadb.monthlyMetrics.findMany({
      orderBy: {
        month: "asc", // Since 'month' is in 'YYYY-MM', string ordering works
      },
    });

    // Format the 'month' field from 'YYYY-MM' to 'MMM YYYY' (e.g., 'Oct 2024')
    const chartData = metrics.map((metric) => {
      // Append '-01' to make it a valid date string (e.g., '2024-10-01')
      const date = parse(`${metric.month}-01`, "yyyy-MM-dd", new Date());

      // Format the date to 'MMM YYYY' (e.g., 'Oct 2024')
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
