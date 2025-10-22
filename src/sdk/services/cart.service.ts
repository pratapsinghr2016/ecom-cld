import { httpClient } from "../http-client";
import { ApiResponse, Cart } from "../types";

export class CartService {
  private static instance: CartService;

  private constructor() {}

  static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  // Get user's cart
  async getCart(): Promise<Cart> {
    const response = await httpClient.get<Cart>("/cart");

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error("Failed to get cart");
  }

  // Add item to cart
  async addToCart(productId: string, quantity: number = 1): Promise<Cart> {
    const response = await httpClient.post<Cart>("/cart/items", {
      productId,
      quantity,
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error("Failed to add item to cart");
  }

  // Update cart item quantity
  async updateCartItem(productId: string, quantity: number): Promise<Cart> {
    const response = await httpClient.put<Cart>(`/cart/items/${productId}`, {
      quantity,
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error("Failed to update cart item");
  }

  // Remove item from cart
  async removeFromCart(productId: string): Promise<Cart> {
    const response = await httpClient.delete<Cart>(`/cart/items/${productId}`);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error("Failed to remove item from cart");
  }

  // Clear entire cart
  async clearCart(): Promise<ApiResponse> {
    return await httpClient.delete("/cart/clear");
  }

  // Apply coupon to cart
  async applyCoupon(couponCode: string): Promise<Cart> {
    const response = await httpClient.post<Cart>("/cart/coupon", {
      couponCode,
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error("Failed to apply coupon");
  }

  // Remove coupon from cart
  async removeCoupon(): Promise<Cart> {
    const response = await httpClient.delete<Cart>("/cart/coupon");

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error("Failed to remove coupon");
  }

  // Get cart item count
  async getCartItemCount(): Promise<number> {
    try {
      const cart = await this.getCart();
      return cart.items.reduce((total, item) => total + item.quantity, 0);
    } catch (error) {
      return 0;
    }
  }

  // Calculate cart total
  async getCartTotal(): Promise<number> {
    try {
      const cart = await this.getCart();
      return cart.totalAmount;
    } catch (error) {
      return 0;
    }
  }
}

// Export singleton instance
export const cartService = CartService.getInstance();
