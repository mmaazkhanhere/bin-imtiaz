import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

import { isAdmin } from "@/helpers/user-check";

export const GET = async () => {
  const { userId } = auth();
  const authorized = userId ? isAdmin(userId) : false;

  try {
    if (!userId || !authorized) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const recentSales = await prismadb.sales.findMany({
      orderBy: { date: "desc" },
      take: 5,
      select: {
        id: true,
        productName: true,
        price: true,
        seller: true,
      },
    });

    return NextResponse.json(recentSales);
  } catch (error) {
    console.error("[RECENT_SALES_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
