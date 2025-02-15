import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      await connectDB();
      const { id } = params;
      const { name, description, price, image } = await req.json();
  
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, description, price, image },
        { new: true, runValidators: true }
      );
  
      if (!updatedProduct) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Product updated successfully", product: updatedProduct }, { status: 200 });
    } catch (error) {
      console.error("Error updating product:", error);
      return NextResponse.json({ message: "Error updating product", error }, { status: 500 });
    }
  }
  
  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
      try {
        await connectDB();
        const { id } = params;
    
        const deletedProduct = await Product.findByIdAndDelete(id);
    
        if (!deletedProduct) {
          return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
    
        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
      } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ message: "Error deleting product", error }, { status: 500 });
      }
    }
    
  
    
