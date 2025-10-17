import { NextResponse } from "next/server";
import { getAuthToken, createAuthHeaders, unauthorizedResponse } from "@/lib/api-helpers";

const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/orders/{id} - Order details
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const { id } = await params;

    const response = await fetch(`${apiUrl}/api/orders/${id}`, {
      headers: createAuthHeaders(token),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch order", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/orders/{id} - Cancel order
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const { id } = await params;

    const response = await fetch(`${apiUrl}/api/orders/${id}`, {
      method: "DELETE",
      headers: createAuthHeaders(token),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to cancel order", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}