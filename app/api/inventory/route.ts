import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/helpers/user-check";
import { InventorySize } from "@prisma/client";

export const GET = async () => {
  const user = auth();
  const authorized = isAdmin(user.userId as string);

  try {
    if (!user.userId || !authorized) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const inventory = await prismadb.inventory.findMany();

    return NextResponse.json(inventory);
  } catch (error) {
    console.log("[INVENTORY_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const user = auth();
  const authorized = isAdmin(user.userId as string);

  try {
    if (!user.userId || !authorized) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const { productName, category, price, color, sizes } = body;

    if (
      !productName ||
      !category ||
      !price ||
      !color ||
      !sizes ||
      !sizes.length
    ) {
      return new NextResponse("Missing Data", { status: 400 });
    }

    const inventory = await prismadb.inventory.create({
      data: {
        productName,
        category,
        price,
        color,
      },
    });

    const sizeData = sizes.map((size: InventorySize) => ({
      size: size.size,
      stock: size.stock,
      stockAvailable: size.stock,
      inventoryId: inventory.id,
    }));

    await prismadb.inventorySize.createMany({ data: sizeData });

    return NextResponse.json({ ...inventory, sizes: sizeData });
  } catch (error) {
    console.log("[INVENTORY_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
