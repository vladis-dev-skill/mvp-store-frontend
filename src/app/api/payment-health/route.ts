import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Via API Gateway
    const backendUrl = "http://mvp-store-gateway/api/payment-service-health";

    // Option 3: Docker internal network (direct to backend service - alternative)
    // const backendUrl = "http://mvp-store-backend:8080/payment-service-health";

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