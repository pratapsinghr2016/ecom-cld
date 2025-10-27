import { store } from "../../store";
import { httpClient } from "../http-client";
import {
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
              pricingOption: item.pricingOption,
            }))
          : [];
      // If search query is present, filter results
      const searchQuery = store.getState().productList.searchedItem;
      if (searchQuery && searchQuery.length > 0) {
        return displayProducts.filter(
          (product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // If filter criteria exist, filter results
      const filters = store.getState().productList.selectedFilters;
      if (filters.pricingOption && filters.pricingOption.length > 0) {
        return displayProducts.filter((product) => {
          let matches = true;
          if (filters.pricingOption?.length) {
            const strPricings = String(product.pricingOption);
            matches = matches && filters.pricingOption?.includes(strPricings);
          }
          return matches;
        });
      }

      // Transform to Product interface
      return displayProducts;
    } catch (error) {
      console.error("Failed to fetch data from API:", error);
      return [];
    }
  }

  // Filter products
  async filterProducts(filters: ProductFilters): Promise<ProductsResponse> {
    const params = {
      ...filters,
    };

    let response = null;
    // real end point to be used
    try {
      response = await httpClient.get<ProductsResponse["data"]>(
        "/products/filter",
        { params }
      );
      console.log("Filter Products API Response:", response);
    } catch (error) {
      console.error("Failed to filter products:", error);
      console.log("Filtering from store state as fallback.");

      const { productList } = store.getState();
      const filteredProducts = productList?.products.filter((product) => {
        let matches = true;
        if (filters.pricingOption?.length) {
          const strPricings = String(product.pricingOption);
          matches =
            matches &&
            filters.pricingOption?.includes(
              strPricings as unknown as PricingOption
            );
        }
        return matches;
      });
      response = {
        ...response,
        data: filteredProducts,
      };
      console.log("Current productList from store:", response);
    }

    return response as ProductsResponse;
  }

  // Search products
  async searchProducts(
    searchQuery: string,
    pagination?: PaginationParams
  ): Promise<ProductsResponse> {
    const params = {
      search: searchQuery,
      ...pagination,
    };

    let response = null;

    try {
      response = await httpClient.get<ProductsResponse["data"]>(
        "/products/search",
        { params }
      );
    } catch (error) {
      console.error("Failed to search products:", error);
      const { productList } = store.getState();
      const searchedProducts = productList?.products.filter((product) => {
        let matches = true;
        if (searchQuery?.length) {
          const { title, username } = product;

          matches =
            matches &&
            (title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              username.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return matches;
      });
      response = {
        ...response,
        data: searchedProducts,
      };
      console.log("Current productList from store:", response);
    }
    console.log("pppppp:", response);
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
