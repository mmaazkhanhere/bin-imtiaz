// /app/api/sales/route.ts

import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/helpers/user-check";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { userId } = auth();
  const authorized = userId ? isAdmin(userId) : false;

  try {
    if (!userId || !authorized) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const { inventoryId, quantity, price, seller, color } = body;

    if (
      !inventoryId ||
      typeof quantity !== "number" ||
      typeof price !== "number" ||
      !seller ||
      !color
    ) {
      return new NextResponse("Missing or Invalid Data", { status: 400 });
    }

    // Fetch the inventory item to get the cost
    const inventoryItem = await prismadb.inventory.findUnique({
      where: { id: inventoryId },
    });

    if (!inventoryItem) {
      return new NextResponse("Inventory item not found", { status: 404 });
    }

    if (quantity > inventoryItem.stockAvailable) {
      return new NextResponse("Not enough stock available", { status: 405 });
    }

    // Calculate profit
    const profit = (price - inventoryItem.price) * quantity;

    // Create the sale
    const sale = await prismadb.sales.create({
      data: {
        productName: inventoryItem.productName,
        category: inventoryItem.category,
        quantity,
        price,
        seller,
        color,
        inventoryId,
        profit,
      },
    });

    await prismadb.inventory.update({
      where: { id: inventoryId },
      data: {
        stockAvailable: inventoryItem.stockAvailable - quantity,
      },
    });

    // Determine the current month in 'YYYY-MM' format
    const currentMonth = new Date().toISOString().slice(0, 7); // e.g., '2024-05'

    // Update MonthlyMetrics
    const existingMetrics = await prismadb.monthlyMetrics.findUnique({
      where: { month: currentMonth },
    });

    if (existingMetrics) {
      // Update existing metrics
      await prismadb.monthlyMetrics.update({
        where: { month: currentMonth },
        data: {
          totalRevenue: existingMetrics.totalRevenue + price * quantity,
          totalSales: existingMetrics.totalSales + quantity,
          totalProfit: existingMetrics.totalProfit + profit,
        },
      });
    } else {
      // Create new metrics for the current month
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
