// Simple HTTP client using fetch instead of axios
import { SDK_CONFIG, getApiUrl } from "./config";
import { handleApiError } from "./errors";
import { ApiResponse, RequestConfig } from "./types";

// Token management
class TokenManager {
  private static instance: TokenManager;

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  getAccessToken(): string | null {
    return localStorage.getItem(SDK_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(SDK_CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(SDK_CONFIG.STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(SDK_CONFIG.STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  clearTokens(): void {
    localStorage.removeItem(SDK_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(SDK_CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(SDK_CONFIG.STORAGE_KEYS.USER_DATA);
  }

  hasValidToken(): boolean {
    return !!this.getAccessToken();
  }
}

// HTTP Client class using fetch
export class HttpClient {
  private readonly tokenManager: TokenManager;

  constructor() {
    this.tokenManager = TokenManager.getInstance();
  }

  private async makeRequest<T = any>(
    url: string,
    options: RequestInit = {},
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const fullUrl = `${getApiUrl()}${url}`;
    const token = this.tokenManager.getAccessToken();

    const headers: HeadersInit = {
      "Content-Type": SDK_CONFIG.HEADERS.CONTENT_TYPE,
      Accept: SDK_CONFIG.HEADERS.ACCEPT,
      ...config?.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers,
        signal: AbortSignal.timeout(config?.timeout || SDK_CONFIG.TIMEOUT),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Public API methods
  async get<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const searchParams = new URLSearchParams();
    if (config?.params) {
      for (const [key, value] of Object.entries(config.params)) {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      }
    }
    const urlWithParams = searchParams.toString()
      ? `${url}?${searchParams}`
      : url;

    return this.makeRequest<T>(urlWithParams, { method: "GET" }, config);
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(
      url,
      {
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      },
      config
    );
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(
      url,
      {
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
      },
      config
    );
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(
      url,
      {
        method: "PATCH",
        body: data ? JSON.stringify(data) : undefined,
      },
      config
    );
  }

  async delete<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(url, { method: "DELETE" }, config);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.tokenManager.hasValidToken();
  }

  // Clear authentication
  clearAuth(): void {
    this.tokenManager.clearTokens();
  }
}

// Create and export singleton instance
export const httpClient = new HttpClient();
export { TokenManager };
