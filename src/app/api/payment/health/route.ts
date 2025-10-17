import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiGatewayUrl = process.env.API_GATEWAY_URL || "http://localhost:8090";
    const backendUrl = `${apiGatewayUrl}/api/payment-service-health`;

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