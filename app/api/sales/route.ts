import { NextResponse, NextRequest } from "next/server";
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

    const sales = await prismadb.sales.findMany({
      orderBy: { date: "desc" },
    });

    return NextResponse.json(sales);
  } catch (error) {
    console.error("Error fetching sales:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { userId } = auth();
  const authorized = userId ? isAdmin(userId) : false;

  try {
    if (!userId || !authorized) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const { inventoryId, quantity, price, seller, color, sizeId } = body;

    if (
      !inventoryId ||
      typeof quantity !== "number" ||
      typeof price !== "number" ||
      !seller ||
      !color ||
      !sizeId
    ) {
      return new NextResponse("Missing or Invalid Data", { status: 400 });
    }

    const inventoryItem = await prismadb.inventory.findUnique({
      where: { id: inventoryId },
    });

    if (!inventoryItem) {
      return new NextResponse("Inventory item not found", { status: 404 });
    }

    const inventorySize = await prismadb.inventorySize.findUnique({
      where: { id: sizeId },
    });

    if (!inventorySize || quantity > inventorySize.stockAvailable) {
      return new NextResponse("Not enough stock available for this size", {
        status: 405,
      });
    }

    const profit = (price - inventoryItem.price) * quantity;

    const sale = await prismadb.sales.create({
      data: {
        productName: inventoryItem.productName,
        category: inventoryItem.category,
        size: inventorySize.size,
        quantity,
        price,
        seller,
        color,
        inventoryId,
        profit,
      },
    });

    await prismadb.inventorySize.update({
      where: { id: sizeId },
      data: {
        stockAvailable: inventorySize.stockAvailable - quantity,
      },
    });

    const currentMonth = new Date().toISOString().slice(0, 7);

    const existingMetrics = await prismadb.monthlyMetrics.findUnique({
      where: { month: currentMonth },
    });

    if (existingMetrics) {
      await prismadb.monthlyMetrics.update({
        where: { month: currentMonth },
        data: {
          totalRevenue: existingMetrics.totalRevenue + price * quantity,
          totalSales: existingMetrics.totalSales + quantity,
          totalProfit: existingMetrics.totalProfit + profit,
        },
      });
    } else {
      await prismadb.monthlyMetrics.create({
        data: {
          month: currentMonth,
          totalRevenue: price * quantity,
          totalSales: quantity,
          totalProfit: profit,
        },
      });
    }

    return NextResponse.json(sale);
  } catch (error) {
    console.error("[SALE_CREATION_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
