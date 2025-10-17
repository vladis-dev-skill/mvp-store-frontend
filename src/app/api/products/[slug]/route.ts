import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

// GET /api/products/{slug} - Product details
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";

    const response = await fetch(`${apiUrl}/api/products/${slug}`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch product",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}