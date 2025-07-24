import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
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
      include: { sizes: true },
    });

    if (!inventoryItem) {
      return NextResponse.json(
        { error: "Inventory item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(inventoryItem);
  } catch (error) {
    console.error("ERROR FETCHING INVENTORY: ", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { inventoryId: string } }
) {
  const inventoryId = params.inventoryId;
  const body = await request.json();

  if (!inventoryId) {
    return NextResponse.json(
      { error: "Inventory ID is required" },
      { status: 400 }
    );
  }

  try {
    // Validate request body
    if (!body.productName || !body.category || !body.color || !body.price) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Start a transaction
    const result = await prismadb.$transaction(async (prisma) => {
      // 1. Update main inventory item
      const updatedInventory = await prisma.inventory.update({
        where: { id: inventoryId },
        data: {
          productName: body.productName,
          category: body.category,
          color: body.color,
          price: parseFloat(body.price),
        },
      });

      // 2. Get current sizes
      const currentSizes = await prisma.inventorySize.findMany({
        where: { inventoryId },
      });

      // 3. Prepare update operations
      const updateOperations = body.sizes.map((size: any) => {
        const data = {
          size: Number(size.size),
          stockAvailable: Number(size.stockAvailable), // Ensure this matches
        };

        if (size.id) {
          // Find the current size object for this size.id
          const currentSize = currentSizes.find((cs) => cs.id === size.id);
          return prisma.inventorySize.update({
            where: { id: size.id },
            data: {
              ...data,
              // Maintain existing stock value
              stock: {
                increment:
                  Number(size.stockAvailable) -
                  (currentSize ? currentSize.stockAvailable : 0),
              },
            },
          });
        } else {
          return prisma.inventorySize.create({
            data: {
              ...data,
              stock: Number(size.stockAvailable), // Set initial stock
              inventoryId,
            },
          });
        }
      });
      // 4. Identify sizes to delete
      const sizeIdsToKeep = body.sizes.map((s: any) => s.id).filter(Boolean);
      const sizesToDelete = currentSizes.filter(
        (s) => !sizeIdsToKeep.includes(s.id)
      );

      // 5. Execute all operations
      await Promise.all([
        ...updateOperations,
        ...sizesToDelete.map((size) =>
          prisma.inventorySize.delete({ where: { id: size.id } })
        ),
      ]);

      // 6. Return updated data
      return prisma.inventory.findUnique({
        where: { id: inventoryId },
        include: { sizes: true },
      });
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("ERROR UPDATING INVENTORY: ", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

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
