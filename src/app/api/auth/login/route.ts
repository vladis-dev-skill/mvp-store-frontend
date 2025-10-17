import { NextResponse } from "next/server";

// POST /api/auth/login - User authentication
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";

    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
        error: "Login failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}