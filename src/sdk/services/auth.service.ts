import { SDK_CONFIG } from "../config";
import { httpClient } from "../http-client";
import {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from "../types";

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse["data"]>(
      "/auth/login",
      credentials
    );

    if (response.success && response.data) {
      // Store tokens and user data
      const { user, tokens } = response.data;
      localStorage.setItem(
        SDK_CONFIG.STORAGE_KEYS.ACCESS_TOKEN,
        tokens.accessToken
      );
      localStorage.setItem(
        SDK_CONFIG.STORAGE_KEYS.REFRESH_TOKEN,
        tokens.refreshToken
      );
      localStorage.setItem(
        SDK_CONFIG.STORAGE_KEYS.USER_DATA,
        JSON.stringify(user)
      );
    }

    return response as AuthResponse;
  }

  // Register new user
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse["data"]>(
      "/auth/register",
      userData
    );

    if (response.success && response.data) {
      // Store tokens and user data
      const { user, tokens } = response.data;
      localStorage.setItem(
        SDK_CONFIG.STORAGE_KEYS.ACCESS_TOKEN,
        tokens.accessToken
      );
      localStorage.setItem(
        SDK_CONFIG.STORAGE_KEYS.REFRESH_TOKEN,
        tokens.refreshToken
      );
      localStorage.setItem(
        SDK_CONFIG.STORAGE_KEYS.USER_DATA,
        JSON.stringify(user)
      );
    }

    return response as AuthResponse;
  }

  // Logout user
  async logout(): Promise<ApiResponse> {
    try {
      const response = await httpClient.post("/auth/logout");
      return response;
    } catch (error) {
      // Even if logout fails on server, clear local storage
      console.warn("Logout request failed, but clearing local data");
      return {
        success: true,
        message: "Logged out locally",
        statusCode: 200,
        data: null,
      };
    } finally {
      // Clear local storage
      this.clearLocalData();
    }
  }

  // Refresh access token
  async refreshToken(): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshToken = localStorage.getItem(
      SDK_CONFIG.STORAGE_KEYS.REFRESH_TOKEN
    );
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await httpClient.post<{
      accessToken: string;
      refreshToken: string;
    }>("/auth/refresh", {
      refreshToken,
    });

    if (response.success && response.data) {
      localStorage.setItem(
        SDK_CONFIG.STORAGE_KEYS.ACCESS_TOKEN,
        response.data.accessToken
      );
      localStorage.setItem(
        SDK_CONFIG.STORAGE_KEYS.REFRESH_TOKEN,
        response.data.refreshToken
      );
      return response.data;
    }

    throw new Error("Failed to refresh token");
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await httpClient.get<User>("/auth/me");

    if (response.success && response.data) {
      localStorage.setItem(
        SDK_CONFIG.STORAGE_KEYS.USER_DATA,
        JSON.stringify(response.data)
      );
      return response.data;
    }

    throw new Error("Failed to get current user");
  }

  // Update user profile
  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await httpClient.put<User>("/auth/profile", userData);

    if (response.success && response.data) {
      localStorage.setItem(
        SDK_CONFIG.STORAGE_KEYS.USER_DATA,
        JSON.stringify(response.data)
      );
      return response.data;
    }

    throw new Error("Failed to update profile");
  }

  // Change password
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse> {
    return await httpClient.put("/auth/change-password", {
      currentPassword,
      newPassword,
    });
  }

  // Forgot password
  async forgotPassword(email: string): Promise<ApiResponse> {
    return await httpClient.post("/auth/forgot-password", { email });
  }

  // Reset password
  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<ApiResponse> {
    return await httpClient.post("/auth/reset-password", {
      token,
      newPassword,
    });
  }

  // Verify email
  async verifyEmail(token: string): Promise<ApiResponse> {
    return await httpClient.post("/auth/verify-email", { token });
  }

  // Resend verification email
  async resendVerificationEmail(): Promise<ApiResponse> {
    return await httpClient.post("/auth/resend-verification");
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(SDK_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
  }

  // Get stored user data
  getStoredUser(): User | null {
    const userData = localStorage.getItem(SDK_CONFIG.STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  }

  // Clear local data
  clearLocalData(): void {
    localStorage.removeItem(SDK_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(SDK_CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(SDK_CONFIG.STORAGE_KEYS.USER_DATA);
  }

  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem(SDK_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
  }

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem(SDK_CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();
