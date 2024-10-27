// File: /app/api/sales/route.ts

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

    // Verify that the inventory item exists
    const inventoryItem = await prismadb.inventory.findUnique({
      where: { id: inventoryId },
    });

    if (!inventoryItem) {
      return new NextResponse("Inventory item not found", { status: 404 });
    }

    // Check if there is enough stock available
    if (inventoryItem.stockAvailable < quantity) {
      return new NextResponse("Insufficient stock available", { status: 400 });
    }

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
      },
    });

    // Update the inventory's stockAvailable
    await prismadb.inventory.update({
      where: { id: inventoryId },
      data: {
        stockAvailable: inventoryItem.stockAvailable - quantity,
      },
    });

    // Determine the current month
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });

    // Update MonthlyMetrics
    await prismadb.monthlyMetrics.upsert({
      where: { month: currentMonth },
      update: {
        totalRevenue: { increment: price * quantity },
        totalSales: { increment: quantity },
      },
      create: {
        month: currentMonth,
        totalRevenue: price * quantity,
        totalSales: quantity,
      },
    });

    return NextResponse.json(sale);
  } catch (error) {
    console.error("Error creating sale:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
