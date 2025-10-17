import { NextResponse } from "next/server";

// GET /api/categories - List all categories
export async function GET() {
  try {
    const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";

    const response = await fetch(`${apiUrl}/api/categories`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch categories",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}