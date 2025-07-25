import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { salesId: string } }
) {
  const salesId = params.salesId;
  const data = await request.json();

  if (!salesId) {
    return NextResponse.json(
      { error: "Sales ID is required" },
      { status: 400 }
    );
  }

  try {
    // Get existing sale record
    const existingSale = await prismadb.sales.findUnique({
      where: { id: salesId },
      include: {
        inventory: true,
      },
    });

    if (!existingSale) {
      return NextResponse.json(
        { error: "Sale entry not found" },
        { status: 404 }
      );
    }

    // Find inventory size records
    const originalSizeRecord = await prismadb.inventorySize.findFirst({
      where: {
        inventoryId: existingSale.inventoryId,
        size: data.originalSize,
      },
    });

    const newSizeRecord = await prismadb.inventorySize.findFirst({
      where: {
        inventoryId: existingSale.inventoryId,
        size: data.size,
      },
    });

    if (!originalSizeRecord || !newSizeRecord) {
      return NextResponse.json(
        { error: "Inventory size not found" },
        { status: 404 }
      );
    }

    // Calculate stock adjustments
    const quantityDifference = data.quantity - data.originalQuantity;
    const sizeChanged = data.size !== data.originalSize;

    // Start transaction
    const transactionOperations = [];

    // Update sale record
    transactionOperations.push(
      prismadb.sales.update({
        where: { id: salesId },
        data: {
          size: data.size,
          quantity: data.quantity,
          price: data.price,
          color: data.color,
          profit: (data.price - existingSale.inventory.price) * data.quantity,
          seller: data.seller,
        },
      })
    );

    // Handle stock adjustments based on changes
    if (sizeChanged) {
      // Return stock to original size
      transactionOperations.push(
        prismadb.inventorySize.update({
          where: { id: originalSizeRecord.id },
          data: {
            stockAvailable: { increment: data.originalQuantity },
            stock: { increment: data.originalQuantity },
          },
        })
      );

      // Deduct stock from new size
      transactionOperations.push(
        prismadb.inventorySize.update({
          where: { id: newSizeRecord.id },
          data: {
            stockAvailable: { decrement: data.quantity },
            stock: { decrement: data.quantity },
          },
        })
      );
    } else {
      // Adjust stock for same size
      transactionOperations.push(
        prismadb.inventorySize.update({
          where: { id: originalSizeRecord.id },
          data: {
            stockAvailable: { increment: -quantityDifference },
            stock: { increment: -quantityDifference },
          },
        })
      );
    }

    // Execute transaction
    await prismadb.$transaction(transactionOperations);

    return NextResponse.json(
      { message: "Sale updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR UPDATING SALES ENTRY: ", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { salesId: string } }
) {
  const salesId = params.salesId;

  if (!salesId) {
    return NextResponse.json(
      { error: "Sales ID is required" },
      { status: 400 }
    );
  }

  try {
    const salesItem = await prismadb.sales.findUnique({
      where: { id: salesId },
    });

    if (!salesItem) {
      return NextResponse.json(
        { error: "Sale entry not found" },
        { status: 404 }
      );
    }

    await prismadb.sales.delete({
      where: { id: salesId },
    });

    return NextResponse.json(
      { message: "Sales entry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR DELETING SALES ENTRY: ", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
