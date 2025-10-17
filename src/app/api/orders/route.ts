import { NextResponse } from "next/server";
import { getAuthToken, createAuthHeaders, unauthorizedResponse } from "@/lib/api-helpers";

const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";

// GET /api/orders - Order history
export async function GET(request: Request) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const response = await fetch(`${apiUrl}/api/orders`, {
      headers: createAuthHeaders(token),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create order
export async function POST(request: Request) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const body = await request.json();

    const response = await fetch(`${apiUrl}/api/orders`, {
      method: "POST",
      headers: createAuthHeaders(token),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}