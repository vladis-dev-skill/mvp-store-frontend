import { NextResponse } from "next/server";
import { getAuthToken, createAuthHeaders, unauthorizedResponse } from "@/lib/api-helpers";

// GET /api/profile/stats - User statistics
export async function GET(request: Request) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";

    const response = await fetch(`${apiUrl}/api/profile/stats`, {
      headers: createAuthHeaders(token),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stats", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}