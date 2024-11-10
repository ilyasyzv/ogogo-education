import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, phone } = await req.json(); // Extract email and phone from request body

    // Validate required fields
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    // Create a new client record in the database
    const client = await db.client.create({
      data: {
        email,
        phone, // Phone number is optional, can be null
      },
    });

    // Respond with the created client data
    return NextResponse.json(client);
  } catch (error) {
    console.error("[CLIENTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
