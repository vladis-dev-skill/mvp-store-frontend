import { NextResponse } from "next/server";
import { getAuthToken, createAuthHeaders, unauthorizedResponse } from "@/lib/api-helpers";

// PUT /api/profile/password - Change password
export async function PUT(request: Request) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const body = await request.json();
    const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";

    const response = await fetch(`${apiUrl}/api/profile/password`, {
      method: "PUT",
      headers: createAuthHeaders(token),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to change password", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}