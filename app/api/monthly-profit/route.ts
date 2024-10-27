import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/helpers/user-check";

export const GET = async () => {
  const { userId } = auth();
  const authorized = userId ? isAdmin(userId as string) : false;

  try {
    if (!userId || !authorized) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch the latest two months sorted by month descending
    const monthlyMetrics = await prismadb.monthlyMetrics.findMany({
      orderBy: {
        month: "desc", // Ensure 'month' is in 'YYYY-MM' format for correct sorting
      },
      take: 2,
    });

    if (monthlyMetrics.length === 0) {
      // No data available
      return NextResponse.json({
        currentProfit: 0,
        previousProfit: 0,
      });
    }

    const currentProfit = monthlyMetrics[0].totalProfit;
    const previousProfit =
      monthlyMetrics.length > 1 ? monthlyMetrics[1].totalProfit : 0;

    return NextResponse.json({
      currentProfit,
      previousProfit,
    });
  } catch (error) {
    console.error("[TOTAL_PROFIT_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
