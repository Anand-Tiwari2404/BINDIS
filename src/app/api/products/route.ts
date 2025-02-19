import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";


export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error("❌ Error fetching products:", error);
    return NextResponse.json({ message: "Error fetching products", error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    if (Array.isArray(data)) {
      if (data.length === 0) {
        return NextResponse.json({ message: "No products to add" }, { status: 400 });
      }
      const savedProducts = await Product.insertMany(data);
      return NextResponse.json({ message: "Products added successfully", products: savedProducts }, { status: 201 });
    }

    const { name, description, price, image } = data;
    if (!name || !description || !price || !image) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();

    return NextResponse.json({ message: "Product added successfully", product: newProduct }, { status: 201 });
  } catch (error) {
    const err = error as Error;
    console.error("❌ Error adding product:", error);
    return NextResponse.json({ message: "Error adding product", error: err.message }, { status: 500 });
  }
}
