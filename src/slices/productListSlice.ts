import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sdk } from "../sdk";
import { DisplayProduct, ProductFilters } from "../sdk/types";

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "productList/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching data from API via Redux...");
      const data = await sdk.products.getProducts(1); // Start with page 1

      // Transform the data to ensure unique IDs with page information
      const transformedData = data.map((product, index) => ({
        ...product,
        id: `${product.id}-api-${index}-1`, // Make IDs unique with page info for page 1
      }));

      console.log("Redux API Response:", transformedData);
      return transformedData;
    } catch (error: any) {
      console.error("Redux: Failed to fetch products:", error);
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  }
);

// Async thunk for loading more products (for infinite scroll)
export const loadMoreProducts = createAsyncThunk(
  "productList/loadMoreProducts",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { productList: ProductListState };
      const { currentPage } = state.productList;
      const nextPage = currentPage + 1;

      console.log(`Loading more products via Redux... Page: ${nextPage}`);

      // Call the real API with next page
      const data = await sdk.products.getProducts(nextPage);

      // Transform the data to ensure unique IDs with page information
      const transformedData = data.map((product, index) => ({
        ...product,
        id: `${product.id}-api-${index}-${nextPage}`, // Make IDs unique with page info
      }));

      console.log(`Redux API Response for page ${nextPage}:`, transformedData);

      return { products: transformedData, page: nextPage };
    } catch (error: any) {
      console.error("Redux: Failed to load more products:", error);
      return rejectWithValue(error.message || "Failed to load more products");
    }
  }
);

// Product list filter state
export const fetchFilteredProducts = createAsyncThunk(
  "productList/fetchFilteredProducts",
  async (filters: ProductFilters, { rejectWithValue }) => {
    try {
      // Filter implementation
      const response = await sdk.products.filterProducts(filters);
      console.log("Applying filters via Redux:", response);

      return { products: response.data, page: 1 };
    } catch (error: any) {
      console.error("Failed to fetch filtered products:", error);
      return rejectWithValue(
        error.message || "Failed to fetch filtered products"
      );
    }
  }
);

// Product list searching
export const fetchSearchedItem = createAsyncThunk(
  "productList/fetchSearchedItem",
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const response = await sdk.products.searchProducts(searchTerm);
      console.log("Searching products via Redux:", response);

      return { products: response.data, page: 1 };
    } catch (error: any) {
      console.error("Failed to fetch searched products:", error);
      return rejectWithValue(
        error.message || "Failed to fetch searched products"
      );
    }
  }
);

interface ProductListState {
  products: DisplayProduct[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  searchedItem: string;
  selectedFilters: Record<string, string[]>;
}

const initialState: ProductListState = {
  products: [],
  loading: false,
  loadingMore: false,
  error: null,
  hasMore: true,
  currentPage: 1,
  selectedFilters: {},
  searchedItem: "",
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetProducts: (state) => {
      state.products = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.error = null;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    setSelectedFilters: (
      state,
      action: PayloadAction<Record<string, string[]>>
    ) => {
      state.selectedFilters = action.payload;
    },
    setSearchedItem: (state, action: PayloadAction<string>) => {
      state.searchedItem = action.payload;
    },
    resetFilters: (state) => {
      state.selectedFilters = {};
      // Also reset products to original state and refetch
      state.products = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.hasMore = action.payload.length > 0;
        state.currentPage = 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle loadMoreProducts
      .addCase(loadMoreProducts.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
      })
      .addCase(loadMoreProducts.fulfilled, (state, action) => {
        state.loadingMore = false;
        state.products = [...state.products, ...action.payload.products];
        state.currentPage = action.payload.page;
        // Set hasMore to false if no new products were returned
        state.hasMore = action.payload.products.length > 0;
      })
      .addCase(loadMoreProducts.rejected, (state, action) => {
        state.loadingMore = false;
        state.error = action.payload as string;
      })
      // Handle fetchFilteredProducts
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.currentPage = action.payload.page || 1;
        state.hasMore = action.payload.products.length > 0;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle fetchSearchedItem
      .addCase(fetchSearchedItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchedItem.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Reducer - searched items:", action.payload);
        state.products = action.payload.products;
        state.currentPage = action.payload.page || 1;
        state.hasMore = action.payload.products.length > 0;
      })
      .addCase(fetchSearchedItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  resetProducts,
  setHasMore,
  setSelectedFilters,
  resetFilters,
  setSearchedItem,
} = productListSlice.actions;
export default productListSlice.reducer;
