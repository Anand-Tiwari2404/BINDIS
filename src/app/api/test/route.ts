import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "Database connected successfully" });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json({ message: "Database connection failed", error }, { status: 500 });
  }
}
