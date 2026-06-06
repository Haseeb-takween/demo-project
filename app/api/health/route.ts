import { NextResponse } from "next/server";
import connectDB from "@/lib/db/";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ status: "ok", database: "connected" });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        database: "unreachable",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
