import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/helpers/user-check";

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

    const { productName, category, totalStock, price, color } = body;

    if (!productName || !category || !totalStock || !price || !color) {
      return new NextResponse("Missing Data", { status: 400 });
    }

    const inventory = await prismadb.inventory.create({
      data: {
        productName,
        category,
        totalStock,
        stockAvailable: totalStock,
        price,
        color,
      },
    });

    return NextResponse.json(inventory);
  } catch (error) {
    console.log("[INVENTORY_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
