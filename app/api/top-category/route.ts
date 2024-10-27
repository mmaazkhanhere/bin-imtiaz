// /app/api/top-category/route.ts

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

    const salesByCategory = await prismadb.sales.groupBy({
      by: ["category"],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 1, // Get the top category
    });

    if (salesByCategory.length === 0) {
      // No sales data available
      return NextResponse.json({
        category: "No Sales Made",
        totalSold: 0,
      });
    }

    const topCategory = salesByCategory[0];

    return NextResponse.json({
      category: topCategory.category,
      totalSold: topCategory._sum.quantity || 0,
    });
  } catch (error) {
    console.error("[TOP_CATEGORY_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
