import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, description, price, image } = await req.json();

    if (!name || !description || !price || !image) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();

    return NextResponse.json({ message: "Product added successfully", product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ message: "Error adding product", error }, { status: 500 });
  }
}


export async function GET() {
    try {
      await connectDB();
      const products = await Product.find({});
      return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json({ message: "Error fetching products", error }, { status: 500 });
    }
  }


