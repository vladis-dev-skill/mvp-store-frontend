import { NextResponse } from "next/server";
import { getAuthToken, createAuthHeaders, unauthorizedResponse } from "@/lib/api-helpers";

const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";

// POST /api/cart/items - Add item to cart
export async function POST(request: Request) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const body = await request.json();

    const response = await fetch(`${apiUrl}/api/cart/items`, {
      method: "POST",
      headers: createAuthHeaders(token),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add item", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}