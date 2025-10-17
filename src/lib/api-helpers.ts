// Helper to get auth token from request headers
export function getAuthToken(request: Request): string | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

// Helper to create authorized fetch options
export function createAuthHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Helper to handle unauthorized responses
export function unauthorizedResponse() {
  return Response.json(
    { error: "Unauthorized", message: "Valid JWT token required" },
    { status: 401 }
  );
}