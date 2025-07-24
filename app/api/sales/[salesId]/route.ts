import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

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
