/**
 * API Error Handling Utilities
 * Provides type-safe error handling for API requests
 */

export interface ApiError {
  success: false;
  error: string;
  message: string;
  statusCode: number;
  details?: unknown;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  statusCode: number;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/**
 * Custom error class for API errors
 */
export class ApiRequestError extends Error {
  statusCode: number;
  error: string;
  details?: unknown;

  constructor(statusCode: number, error: string, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiRequestError';
    this.statusCode = statusCode;
    this.error = error;
    this.details = details;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiRequestError);
    }
  }
}

/**
 * Parse error response from API
 */
export async function parseApiError(response: Response): Promise<ApiError> {
  try {
    const data = await response.json();
    return {
      success: false,
      error: data.error || 'UnknownError',
      message: data.message || 'An unknown error occurred',
      statusCode: response.status,
      details: data.details,
    };
  } catch {
    return {
      success: false,
      error: 'ParseError',
      message: 'Failed to parse error response',
      statusCode: response.status,
    };
  }
}

/**
 * Handle API errors with user-friendly messages
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiRequestError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred. Please try again.';
}

/**
 * Get user-friendly error message based on status code
 */
export function getStatusMessage(statusCode: number): string {
  const messages: Record<number, string> = {
    400: 'Invalid request. Please check your input.',
    401: 'You need to be logged in to perform this action.',
    403: 'You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    409: 'This resource already exists.',
    429: 'Too many requests. Please try again later.',
    500: 'A server error occurred. Please try again later.',
    502: 'Service temporarily unavailable. Please try again.',
    503: 'Service temporarily unavailable. Please try again.',
    504: 'Request timeout. Please try again.',
  };

  return messages[statusCode] || 'An error occurred. Please try again.';
}

/**
 * Retry failed API requests with exponential backoff
 */
export async function retryRequest<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (4xx)
      if (error instanceof ApiRequestError && error.statusCode >= 400 && error.statusCode < 500) {
        throw error;
      }

      // Calculate exponential backoff delay
      const delay = baseDelay * Math.pow(2, attempt);

      // Wait before retrying (unless it's the last attempt)
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return true;
  }
  return false;
}

/**
 * Check if error is a timeout error
 */
export function isTimeoutError(error: unknown): boolean {
  if (error instanceof ApiRequestError && error.statusCode === 504) {
    return true;
  }
  return false;
}

/**
 * Check if error is a rate limit error
 */
export function isRateLimitError(error: unknown): boolean {
  if (error instanceof ApiRequestError && error.statusCode === 429) {
    return true;
  }
  return false;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (error instanceof ApiRequestError && (error.statusCode === 401 || error.statusCode === 403)) {
    return true;
  }
  return false;
}

/**
 * Format validation errors
 */
export function formatValidationErrors(details: unknown): string[] {
  if (!details || typeof details !== 'object') {
    return [];
  }

  const errors: string[] = [];

  if (Array.isArray(details)) {
    return details.map(err => {
      if (typeof err === 'string') return err;
      if (err.message) return err.message;
      return JSON.stringify(err);
    });
  }

  // Handle Zod-style errors
  if ('issues' in details && Array.isArray((details as any).issues)) {
    return (details as any).issues.map((issue: any) => {
      const path = issue.path?.join('.') || '';
      return path ? `${path}: ${issue.message}` : issue.message;
    });
  }

  return errors;
}

/**
 * Log error to external service
 */
export function logError(error: unknown, context?: Record<string, unknown>): void {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error, context);
  }

  // Send to external error tracking service
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, {
      contexts: {
        custom: context,
      },
    });
  }
}
