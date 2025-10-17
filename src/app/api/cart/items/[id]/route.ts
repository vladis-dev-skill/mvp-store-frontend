import { NextResponse } from "next/server";
import { getAuthToken, createAuthHeaders, unauthorizedResponse } from "@/lib/api-helpers";

const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/cart/items/{id} - Update quantity
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const { id } = await params;
    const body = await request.json();

    const response = await fetch(`${apiUrl}/api/cart/items/${id}`, {
      method: "PUT",
      headers: createAuthHeaders(token),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update item", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/items/{id} - Remove from cart
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const { id } = await params;

    const response = await fetch(`${apiUrl}/api/cart/items/${id}`, {
      method: "DELETE",
      headers: createAuthHeaders(token),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove item", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}