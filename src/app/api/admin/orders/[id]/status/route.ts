import { NextResponse } from "next/server";
import { getAuthToken, createAuthHeaders, unauthorizedResponse } from "@/lib/api-helpers";

const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/admin/orders/{id}/status - Update order status
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const { id } = await params;
    const body = await request.json();

    const response = await fetch(`${apiUrl}/api/admin/orders/${id}/status`, {
      method: "PUT",
      headers: createAuthHeaders(token),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
  }
}