import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Smart detection of environment
    // Try Docker gateway first, fallback to localhost if fails
    const dockerGateway = 'http://mvp-store-gateway:80';
    const localhostGateway = 'http://localhost:8090';

    let endpoint: string;
    let gatewayUrl: string;

    // Check if API_GATEWAY_URL is set (Docker environment)
    const envGateway = process.env.API_GATEWAY_URL;

    if (envGateway && envGateway.includes('mvp-store-gateway')) {
      // Running in Docker
      gatewayUrl = dockerGateway;
      endpoint = `${gatewayUrl}/api/payment-service-health`;
      console.log(`[Frontend API] Environment: Docker`);
    } else {
      // Running locally (npm run dev on port 3001)
      gatewayUrl = localhostGateway;
      endpoint = `${gatewayUrl}/api/payment-service-health`;
      console.log(`[Frontend API] Environment: Local dev`);
    }

    console.log(`[Frontend API] Calling Backend: ${endpoint}`);

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Disable caching for health checks
      cache: 'no-store',
    });

    console.log(`[Frontend API] Response status: ${response.status}`);

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error(`[Frontend API] Non-JSON response:`, text.substring(0, 200));

      return NextResponse.json(
        {
          error: 'Backend returned non-JSON response',
          message: `Expected JSON but got: ${contentType}`,
          preview: text.substring(0, 200),
          timestamp: new Date().toISOString(),
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    console.log(`[Frontend API] Backend response:`, data);

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('[Frontend API] Error calling backend:', error);

    // If Docker gateway failed, try localhost as fallback
    if (error.message.includes('fetch failed') || error.code === 'ECONNREFUSED') {
      console.log('[Frontend API] Docker gateway failed, trying localhost fallback...');

      try {
        const fallbackEndpoint = 'http://localhost:8090/api/payment-service-health';
        console.log(`[Frontend API] Fallback to: ${fallbackEndpoint}`);

        const fallbackResponse = await fetch(fallbackEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          cache: 'no-store',
        });

        const data = await fallbackResponse.json();
        console.log(`[Frontend API] Fallback successful:`, data);

        return NextResponse.json(data, { status: fallbackResponse.status });
      } catch (fallbackError: any) {
        console.error('[Frontend API] Fallback also failed:', fallbackError);
      }
    }

    return NextResponse.json(
      {
        error: 'Failed to reach backend service',
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}