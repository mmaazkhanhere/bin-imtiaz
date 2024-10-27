import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/helpers/user-check";

export const GET = async () => {
  const { userId } = auth();
  const authorized = isAdmin(userId as string);

  try {
    if (!userId || !authorized) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const monthlySales = await prismadb.monthlyMetrics.findMany({
      orderBy: {
        month: "desc",
      },
      take: 2,
    });

    if (monthlySales.length === 0) {
      return NextResponse.json({
        currentSales: 0,
        previousSales: 0,
      });
    }

    const currentSales = monthlySales[0].totalSales;
    const previousSales =
      monthlySales.length > 1 ? monthlySales[1].totalSales : 0;

    return NextResponse.json({
      currentSales,
      previousSales,
    });
  } catch (error) {
    console.log("[METRICS_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
