import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Option 1: Direct to Backend (development without Docker)
    // const backendUrl = "http://localhost:8191/payment-service-health";

    // Option 2: Via API Gateway (recommended - production-like with load balancing)
    // const backendUrl = "http://mvp-store-nginx:80/api/payment-service-health";

    // Option 3: Docker internal network (direct to backend service - currently active)
    const backendUrl = "http://mvp-store-backend:8080/payment-service-health";

    const response = await fetch(backendUrl);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch payment service health",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}