import axios, { AxiosInstance, AxiosError } from 'axios';
import { config } from '../config';
import { AgentLogger } from '../logging/AgentLogger';

export class ObservatoryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.api.baseUrl,
      timeout: config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
        'X-Agent-ID': config.agent.id
      }
    });

    // DA-057: Toda comunicación entre procesos es observable
    this.client.interceptors.response.use(
      (response) => {
        AgentLogger.info('Llamada HTTP Exitosa', {
          destination: response.config.baseURL,
          endpoint: response.config.url,
          method: response.config.method?.toUpperCase(),
          status: response.status,
          requestId: response.data?.meta?.requestId || 'N/A'
        });
        return response;
      },
      (error: AxiosError) => {
        AgentLogger.error('Llamada HTTP Fallida', {
          destination: error.config?.baseURL,
          endpoint: error.config?.url,
          method: error.config?.method?.toUpperCase(),
          status: error.response?.status || 'NETWORK_ERROR',
          errorMessage: error.message
        });
        return Promise.reject(error);
      }
    );
  }

  /**
   * Envía un payload a la API y aplica Retry Policy
   */
  async sendCapture(payload: any, attempt = 1): Promise<void> {
    try {
      await this.client.post('/captures', payload);
    } catch (error: any) {
      if (this.isRetryable(error) && attempt <= config.api.retryCount) {
        AgentLogger.info(`Reintentando envío (Intento ${attempt} de ${config.api.retryCount})...`);
        await this.delay(config.api.backoffMs * attempt); // Backoff lineal simple
        return this.sendCapture(payload, attempt + 1);
      }
      throw error;
    }
  }

  private isRetryable(error: AxiosError): boolean {
    if (!error.response) return true; // Error de red (timeout, connection refused)
    return error.response.status >= 500; // Error interno del servidor
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
