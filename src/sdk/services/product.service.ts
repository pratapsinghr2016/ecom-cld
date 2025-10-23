import { httpClient } from "../http-client";
import {
  ApiResponse,
  DisplayProduct,
  PaginationParams,
  PricingOption,
  Product,
  ProductFilters,
  ProductsResponse,
} from "../types";

export class ProductService {
  private static instance: ProductService;

  private constructor() {}

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  // Get data from the closet recruiting API
  async getProducts(page: number = 1): Promise<DisplayProduct[]> {
    try {
      const response = await httpClient.get<any>("/data");

      // Handle different response formats
      let rawData: any[] = [];

      if (Array.isArray(response)) {
        rawData = response;
      } else if (
        response.data &&
        response.success &&
        Array.isArray(response.data)
      ) {
        rawData = response.data;
      } else {
        console.log("Unexpected response format:", response);
        return [];
      }

      const displayProducts =
        rawData.length > 0
          ? rawData.map((item, index) => ({
              id: item.id || `api-${index}`,
              page: page,
              image:
                item.imagePath ||
                `https://images.unsplash.com/photo-${
                  1591047139829 + index
                }?w=400`,
              username: item.creator || "unknown_user",
              title: item.title || `Item ${index + 1}`,
              price: item.price || Math.floor(Math.random() * 20) + 5,
              views: Math.floor(Math.random() * 200) + 50,
              likes: Math.floor(Math.random() * 60) + 10,
              pricingOption: item.pricingOption || PricingOption.FREE,
            }))
          : [];

      // Transform to Product interface
      return displayProducts;
    } catch (error) {
      console.error("Failed to fetch data from API:", error);
      return [];
    }
  }

  // Get featured products
  async getFeaturedProducts(limit: number = 10): Promise<ProductsResponse> {
    const response = await httpClient.get<ProductsResponse["data"]>(
      "/products/featured",
      {
        params: { limit },
      }
    );
    return response as ProductsResponse;
  }

  // Get product by ID
  async getProductById(id: string): Promise<Product> {
    const response = await httpClient.get<Product>(`/products/${id}`);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error("Product not found");
  }

  // Search products
  async searchProducts(
    query: string,
    filters?: ProductFilters,
    pagination?: PaginationParams
  ): Promise<ProductsResponse> {
    const params = {
      search: query,
      ...filters,
      ...pagination,
    };

    const response = await httpClient.get<ProductsResponse["data"]>(
      "/products/search",
      { params }
    );
    return response as ProductsResponse;
  }

  // Get products by category
  async getProductsByCategory(
    category: string,
    pagination?: PaginationParams
  ): Promise<ProductsResponse> {
    const params = {
      category,
      ...pagination,
    };

    const response = await httpClient.get<ProductsResponse["data"]>(
      "/products/category",
      { params }
    );
    return response as ProductsResponse;
  }

  // Get product recommendations
  async getRecommendations(
    productId: string,
    limit: number = 5
  ): Promise<Product[]> {
    const response = await httpClient.get<Product[]>(
      `/products/${productId}/recommendations`,
      {
        params: { limit },
      }
    );

    if (response.success && response.data) {
      return response.data;
    }

    return [];
  }

  // Get product reviews
  async getProductReviews(
    productId: string,
    pagination?: PaginationParams
  ): Promise<ApiResponse<any[]>> {
    const response = await httpClient.get(`/products/${productId}/reviews`, {
      params: pagination,
    });
    return response;
  }

  // Add product review (requires authentication)
  async addProductReview(
    productId: string,
    review: {
      rating: number;
      comment: string;
      title?: string;
    }
  ): Promise<ApiResponse> {
    return await httpClient.post(`/products/${productId}/reviews`, review);
  }

  // Get product categories
  async getCategories(): Promise<string[]> {
    const response = await httpClient.get<string[]>("/products/categories");

    if (response.success && response.data) {
      return response.data;
    }

    return [];
  }

  // Get price range for filters
  async getPriceRange(): Promise<{ min: number; max: number }> {
    const response = await httpClient.get<{ min: number; max: number }>(
      "/products/price-range"
    );

    if (response.success && response.data) {
      return response.data;
    }

    return { min: 0, max: 1000 };
  }
}

// Export singleton instance
export const productService = ProductService.getInstance();
