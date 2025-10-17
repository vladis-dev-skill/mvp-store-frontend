import { NextResponse } from "next/server";
import { getAuthToken, createAuthHeaders, unauthorizedResponse } from "@/lib/api-helpers";

const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/profile/addresses/{id} - Update address
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const { id } = await params;
    const body = await request.json();

    const response = await fetch(`${apiUrl}/api/profile/addresses/${id}`, {
      method: "PUT",
      headers: createAuthHeaders(token),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update address", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/profile/addresses/{id} - Delete address
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const { id } = await params;

    const response = await fetch(`${apiUrl}/api/profile/addresses/${id}`, {
      method: "DELETE",
      headers: createAuthHeaders(token),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete address", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}