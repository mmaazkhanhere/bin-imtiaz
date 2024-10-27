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

    const monthlyRevenue = await prismadb.monthlyMetrics.findMany({
      orderBy: {
        month: "desc",
      },
      take: 2,
    });

    if (monthlyRevenue.length === 0) {
      return NextResponse.json({
        currentRevenue: 0,
        previousRevenue: 0,
      });
    }

    const currentRevenue = monthlyRevenue[0].totalRevenue;
    const previousRevenue =
      monthlyRevenue.length > 1 ? monthlyRevenue[1].totalRevenue : 0;

    return NextResponse.json({
      currentRevenue,
      previousRevenue,
    });
  } catch (error) {
    console.log("[METRICS_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
