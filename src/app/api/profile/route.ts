import { NextResponse } from "next/server";
import { getAuthToken, createAuthHeaders, unauthorizedResponse } from "@/lib/api-helpers";

const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";

// GET /api/profile - Get user profile
export async function GET(request: Request) {
  try {
    const token = getAuthToken(request);
    if (!token) {
      return unauthorizedResponse();
    }

    const response = await fetch(`${apiUrl}/api/profile`, {
      headers: createAuthHeaders(token),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch profile",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// PUT /api/profile - Update user profile
export async function PUT(request: Request) {
  try {
    const token = getAuthToken(request);
    if (!token) {
      return unauthorizedResponse();
    }

    const body = await request.json();

    const response = await fetch(`${apiUrl}/api/profile`, {
      method: "PUT",
      headers: createAuthHeaders(token),
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update profile",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}