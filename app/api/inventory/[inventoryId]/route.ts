import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export const PATCH = async (request: NextRequest) => {
  const { pathname } = new URL(request.url);

  const parts = pathname.split("/");
  const inventoryId = parts[parts.length - 2];
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: { inventoryId: string } }
) {
  const inventoryId = params.inventoryId;

  if (!inventoryId) {
    return NextResponse.json(
      { error: "Inventory ID is required" },
      { status: 400 }
    );
  }

  try {
    const inventoryItem = await prismadb.inventory.findUnique({
      where: { id: inventoryId },
    });

    if (!inventoryItem) {
      return NextResponse.json(
        { error: "Inventory item not found" },
        { status: 404 }
      );
    }

    await prismadb.inventory.delete({
      where: { id: inventoryId },
    });

    return NextResponse.json(
      { message: "Inventory deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR DELETING INVENTORY: ", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
