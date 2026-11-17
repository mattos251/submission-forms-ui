import { APP_CONFIG, MESSAGES } from '../constants/index.js';

/**
 * Erros customizados para a camada de API
 */
export class ApiError extends Error {
  constructor(message, statusCode = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export class NetworkError extends ApiError {
  constructor(message = MESSAGES.error.network) {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * Cliente de API centralizado com tratamento de erros robusto
 */
class ApiClient {
  constructor(config = APP_CONFIG) {
    this.config = config;
  }

  async request(endpoint, options = {}) {
    const url = this.buildUrl(endpoint);
    const signal = this.createAbortSignal();

    try {
      const response = await fetch(url, {
        ...options,
        signal,
      });

      return await this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  buildUrl(endpoint) {
    return `${this.config.api.baseUrl}${endpoint}`;
  }

  createAbortSignal() {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.config.api.timeout
    );
    return controller.signal;
  }

  async handleResponse(response) {
    if (!response.ok) {
      const errorMessage = await this.extractErrorMessage(response);
      throw new ApiError(errorMessage, response.status);
    }
    return response;
  }

  async extractErrorMessage(response) {
    try {
      const data = await response.json();
      return data.error?.message || MESSAGES.error.unknown;
    } catch {
      return MESSAGES.error.unknown;
    }
  }

  handleError(error) {
    if (error.name === 'AbortError') {
      throw new ApiError(MESSAGES.error.timeout);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    if (!navigator.onLine) {
      throw new NetworkError();
    }

    throw new ApiError(`${MESSAGES.error.request}: ${error.message}`);
  }
}

/**
 * Serviço de Conversão
 */
export class ConversionService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async convertFile(file, { keepCommentedFields = true } = {}) {
    const formData = new FormData();
    formData.append('file', file);

    const query = new URLSearchParams({ keepCommentedFields: String(keepCommentedFields) });

    const response = await this.apiClient.request(
      `${APP_CONFIG.api.endpoints.conversions}?${query}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    return response.blob();
  }
}

// Singleton do ApiClient
export const apiClient = new ApiClient();
