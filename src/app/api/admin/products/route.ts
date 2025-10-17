import { NextResponse } from "next/server";
import { getAuthToken, createAuthHeaders, unauthorizedResponse } from "@/lib/api-helpers";

const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";

// GET /api/admin/products - List products (admin)
export async function GET(request: Request) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const response = await fetch(`${apiUrl}/api/admin/products`, {
      headers: createAuthHeaders(token),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

// POST /api/admin/products - Create product
export async function POST(request: Request) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const body = await request.json();

    const response = await fetch(`${apiUrl}/api/admin/products`, {
      method: "POST",
      headers: createAuthHeaders(token),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}