import {
  ApiRequestError,
  parseApiError,
  retryRequest,
  logError,
  type ApiResponse,
} from './error';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';
const DEFAULT_TIMEOUT = 30000; // 30 seconds

interface PaginatedResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Language {
  id: number;
  name: string;
  description: string;
  useCases: string[];
  advantages: string[];
  salaryRange: {
    min: number;
    max: number;
    currency: string;
    experienceLevel?: string;
  };
  popularityIndex: number;
  releaseYear: number;
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CareerPath {
  id: number;
  languageId: number;
  title: string;
  description: string;
  salaryRange: {
    min: number;
    max: number;
    currency: string;
    experienceLevel?: string;
  };
  experienceRequired: string;
  createdAt: string;
  language: {
    id: number;
    name: string;
    logoUrl: string;
    popularityIndex: number;
  };
}

/**
 * Make API request with error handling and timeout
 */
async function request<T>(
  url: string,
  options?: RequestInit,
  timeout: number = DEFAULT_TIMEOUT
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await parseApiError(response);
      throw new ApiRequestError(
        error.statusCode,
        error.error,
        error.message,
        error.details
      );
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle abort/timeout errors
    if (error instanceof Error && error.name === 'AbortError') {
      const timeoutError = new ApiRequestError(
        504,
        'Timeout',
        'Request timed out. Please try again.',
      );
      logError(timeoutError, { url, options });
      throw timeoutError;
    }

    // Handle network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      const networkError = new ApiRequestError(
        0,
        'NetworkError',
        'Unable to connect to the server. Please check your internet connection.',
      );
      logError(networkError, { url, options });
      throw networkError;
    }

    // Re-throw ApiRequestError
    if (error instanceof ApiRequestError) {
      logError(error, { url, options });
      throw error;
    }

    // Handle unknown errors
    const unknownError = new ApiRequestError(
      500,
      'UnknownError',
      error instanceof Error ? error.message : 'An unknown error occurred',
    );
    logError(unknownError, { url, options, originalError: error });
    throw unknownError;
  }
}

export const api = {
  async getLanguages(params?: {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
    order?: 'asc' | 'desc';
  }): Promise<PaginatedResponse<Language[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.order) queryParams.append('order', params.order);

    const url = `${API_URL}/languages${queryParams.toString() ? `?${queryParams}` : ''}`;

    // Retry GET requests up to 3 times
    return retryRequest(() => request<PaginatedResponse<Language[]>>(url));
  },

  async getLanguageById(id: number): Promise<PaginatedResponse<Language>> {
    const url = `${API_URL}/languages/${id}`;

    // Retry GET requests up to 3 times
    return retryRequest(() => request<PaginatedResponse<Language>>(url));
  },

  async createLanguage(language: Omit<Language, 'id' | 'createdAt' | 'updatedAt'>): Promise<PaginatedResponse<Language>> {
    const url = `${API_URL}/languages`;

    // Don't retry POST requests (they're not idempotent)
    return request<PaginatedResponse<Language>>(url, {
      method: 'POST',
      body: JSON.stringify(language),
    });
  },

  async updateLanguage(id: number, language: Partial<Language>): Promise<PaginatedResponse<Language>> {
    const url = `${API_URL}/languages/${id}`;

    // Don't retry PUT requests (they're not idempotent)
    return request<PaginatedResponse<Language>>(url, {
      method: 'PUT',
      body: JSON.stringify(language),
    });
  },

  async deleteLanguage(id: number): Promise<PaginatedResponse<void>> {
    const url = `${API_URL}/languages/${id}`;

    // Don't retry DELETE requests (they're not idempotent)
    return request<PaginatedResponse<void>>(url, {
      method: 'DELETE',
    });
  },

  async getCareerPaths(params?: {
    page?: number;
    limit?: number;
    languageId?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  }): Promise<PaginatedResponse<CareerPath[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.languageId) queryParams.append('languageId', params.languageId.toString());
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.order) queryParams.append('order', params.order);

    const url = `${API_URL}/career-paths${queryParams.toString() ? `?${queryParams}` : ''}`;

    // Retry GET requests up to 3 times
    return retryRequest(() => request<PaginatedResponse<CareerPath[]>>(url));
  },
};

export type { PaginatedResponse, ApiResponse };
