import { NextResponse } from "next/server";
import { getAuthToken, createAuthHeaders, unauthorizedResponse } from "@/lib/api-helpers";

const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";

// GET /api/admin/dashboard - Admin statistics
export async function GET(request: Request) {
  try {
    const token = getAuthToken(request);
    if (!token) return unauthorizedResponse();

    const response = await fetch(`${apiUrl}/api/admin/dashboard`, {
      headers: createAuthHeaders(token),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch dashboard" }, { status: 500 });
  }
}