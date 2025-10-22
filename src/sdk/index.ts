// Export all services
export { authService, AuthService } from "./services/auth.service";
export { cartService, CartService } from "./services/cart.service";
export { productService, ProductService } from "./services/product.service";

// Export HTTP client
export { httpClient, HttpClient } from "./http-client";

// Export types
export * from "./types";

// Export errors
export * from "./errors";

// Export config
export * from "./config";

// Main SDK class
import { httpClient } from "./http-client";
import { authService } from "./services/auth.service";
import { cartService } from "./services/cart.service";
import { productService } from "./services/product.service";

export class SDK {
  private static instance: SDK;

  public auth = authService;
  public products = productService;
  public cart = cartService;
  public http = httpClient;

  private constructor() {}

  static getInstance(): SDK {
    if (!SDK.instance) {
      SDK.instance = new SDK();
    }
    return SDK.instance;
  }

  // Initialize SDK with configuration
  static init(config?: { baseUrl?: string; timeout?: number }): SDK {
    if (config?.baseUrl) {
      // You can update the base URL here if needed
      console.log("SDK initialized with custom base URL:", config.baseUrl);
    }

    return SDK.getInstance();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  // Logout and clear all data
  async logout(): Promise<void> {
    await this.auth.logout();
  }
}

// Export default SDK instance
export const sdk = SDK.getInstance();
export default sdk;
