import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export const GET = async (req: NextRequest) => {
  const { pathname } = new URL(req.url);

  const parts = pathname.split("/");
  const inventoryId = parts[parts.length - 2];

  try {
    if (!inventoryId) {
      return NextResponse.json(
        { error: "Inventory ID is required" },
        { status: 400 }
      );
    }

    const inventoryItem = await prismadb.inventory.findUnique({
      where: { id: inventoryId },
      include: { sizes: true },
    });

    if (!inventoryItem) {
      return NextResponse.json(
        { error: "Inventory item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(inventoryItem.sizes);
  } catch (error) {
    console.error("Error fetching inventory sizes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
