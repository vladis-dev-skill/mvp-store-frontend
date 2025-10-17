// Client-side API utility with JWT support

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

class ApiClient {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = "/api";
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { requiresAuth = false, headers = {}, ...restOptions } = options;

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(headers as Record<string, string>),
    };

    // Add authorization header if required
    if (requiresAuth) {
      const token = this.getToken();
      if (!token) {
        throw new Error("Authentication required");
      }
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...restOptions,
      headers: requestHeaders,
    });

    if (response.status === 401) {
      // Token expired or invalid
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(error.error || "Request failed");
    }

    return response.json();
  }

  // Public endpoints
  async getProducts(params?: { page?: number; limit?: number; category?: string; sort?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/products${query ? `?${query}` : ""}`);
  }

  async getProduct(slug: string) {
    return this.request(`/products/${slug}`);
  }

  async getCategories() {
    return this.request("/categories");
  }

  // Auth endpoints
  async register(data: { email: string; password: string; firstName: string; lastName: string }) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async refreshToken(refreshToken: string) {
    return this.request("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  }

  // Profile endpoints (protected)
  async getProfile() {
    return this.request("/profile", { requiresAuth: true });
  }

  async updateProfile(data: any) {
    return this.request("/profile", {
      method: "PUT",
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    return this.request("/profile/password", {
      method: "PUT",
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async getAddresses() {
    return this.request("/profile/addresses", { requiresAuth: true });
  }

  async addAddress(data: any) {
    return this.request("/profile/addresses", {
      method: "POST",
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async updateAddress(id: string, data: any) {
    return this.request(`/profile/addresses/${id}`, {
      method: "PUT",
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async deleteAddress(id: string) {
    return this.request(`/profile/addresses/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    });
  }

  async getProfileStats() {
    return this.request("/profile/stats", { requiresAuth: true });
  }

  // Cart endpoints (protected)
  async getCart() {
    return this.request("/cart", { requiresAuth: true });
  }

  async addToCart(data: { productId: string; quantity: number }) {
    return this.request("/cart/items", {
      method: "POST",
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async updateCartItem(id: string, data: { quantity: number }) {
    return this.request(`/cart/items/${id}`, {
      method: "PUT",
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async removeFromCart(id: string) {
    return this.request(`/cart/items/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    });
  }

  async clearCart() {
    return this.request("/cart", {
      method: "DELETE",
      requiresAuth: true,
    });
  }

  // Orders endpoints (protected)
  async getOrders() {
    return this.request("/orders", { requiresAuth: true });
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`, { requiresAuth: true });
  }

  async createOrder(data: any) {
    return this.request("/orders", {
      method: "POST",
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async cancelOrder(id: string) {
    return this.request(`/orders/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    });
  }

  // Admin endpoints (protected)
  async getAdminProducts() {
    return this.request("/admin/products", { requiresAuth: true });
  }

  async createProduct(data: any) {
    return this.request("/admin/products", {
      method: "POST",
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async updateProduct(id: string, data: any) {
    return this.request(`/admin/products/${id}`, {
      method: "PUT",
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/admin/products/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    });
  }

  async getAdminOrders() {
    return this.request("/admin/orders", { requiresAuth: true });
  }

  async updateOrderStatus(id: string, status: string) {
    return this.request(`/admin/orders/${id}/status`, {
      method: "PUT",
      requiresAuth: true,
      body: JSON.stringify({ status }),
    });
  }

  async getAdminUsers() {
    return this.request("/admin/users", { requiresAuth: true });
  }

  async getAdminDashboard() {
    return this.request("/admin/dashboard", { requiresAuth: true });
  }
}

// Export singleton instance
export const api = new ApiClient();