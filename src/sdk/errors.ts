// Custom error classes for different types of API errors
export class SDKError extends Error {
  public statusCode: number;
  public code?: string;
  public details?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    code?: string,
    details?: any
  ) {
    super(message);
    this.name = "SDKError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export class NetworkError extends SDKError {
  constructor(message: string = "Network connection failed") {
    super(message, 0, "NETWORK_ERROR");
    this.name = "NetworkError";
  }
}

export class AuthenticationError extends SDKError {
  constructor(message: string = "Authentication failed") {
    super(message, 401, "AUTH_ERROR");
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends SDKError {
  constructor(message: string = "Access denied") {
    super(message, 403, "AUTHORIZATION_ERROR");
    this.name = "AuthorizationError";
  }
}

export class ValidationError extends SDKError {
  constructor(message: string = "Validation failed", details?: any) {
    super(message, 400, "VALIDATION_ERROR", details);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends SDKError {
  constructor(message: string = "Resource not found") {
    super(message, 404, "NOT_FOUND_ERROR");
    this.name = "NotFoundError";
  }
}

export class ServerError extends SDKError {
  constructor(message: string = "Internal server error") {
    super(message, 500, "SERVER_ERROR");
    this.name = "ServerError";
  }
}

export class TimeoutError extends SDKError {
  constructor(message: string = "Request timeout") {
    super(message, 408, "TIMEOUT_ERROR");
    this.name = "TimeoutError";
  }
}

// Error factory function to create appropriate error instances
export const createError = (error: any): SDKError => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    const message = data?.message || data?.error || error.message;
    const details = data?.details || data?.errors;

    switch (status) {
      case 400:
        return new ValidationError(message, details);
      case 401:
        return new AuthenticationError(message);
      case 403:
        return new AuthorizationError(message);
      case 404:
        return new NotFoundError(message);
      case 408:
        return new TimeoutError(message);
      case 500:
      case 502:
      case 503:
      case 504:
        return new ServerError(message);
      default:
        return new SDKError(message, status, data?.code, details);
    }
  } else if (error.request) {
    // Network error
    return new NetworkError("Network connection failed");
  } else if (error.code === "ECONNABORTED") {
    // Timeout error
    return new TimeoutError("Request timeout");
  } else {
    // Other errors
    return new SDKError(error.message || "Unknown error occurred");
  }
};

// Error handler utility
export const handleApiError = (error: any): never => {
  const sdkError = createError(error);
  throw sdkError;
};

// Check if error is a specific type
export const isAuthError = (error: any): boolean => {
  return (
    error instanceof AuthenticationError || error instanceof AuthorizationError
  );
};

export const isNetworkError = (error: any): boolean => {
  return error instanceof NetworkError;
};

export const isValidationError = (error: any): boolean => {
  return error instanceof ValidationError;
};
