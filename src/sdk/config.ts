// Base configuration for the SDK
export const SDK_CONFIG = {
  // Base API URL - updated to use the closet recruiting API
  BASE_URL:
    import.meta.env.VITE_API_URL ||
    "https://closet-recruiting-api.azurewebsites.net/api",

  // API version - not needed for this specific API
  API_VERSION: "",

  // Request timeout in milliseconds
  TIMEOUT: 10000,

  // Retry configuration
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,

  // Storage keys
  STORAGE_KEYS: {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
    USER_DATA: "user_data",
  },

  // Headers
  HEADERS: {
    CONTENT_TYPE: "application/json",
    ACCEPT: "application/json",
  },
} as const;

// Environment configuration
export const getApiUrl = () => {
  const baseUrl = SDK_CONFIG.BASE_URL;
  // Return base URL without version since the API endpoint is directly /api/data
  return baseUrl;
};

export type SDKConfig = typeof SDK_CONFIG;
