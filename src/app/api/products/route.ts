import { NextRequest, NextResponse } from "next/server";

// GET /api/products - List products with pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "20";
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");

    const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(category && { category }),
      ...(sort && { sort }),
    });

    const response = await fetch(`${apiUrl}/api/products?${queryParams}`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}