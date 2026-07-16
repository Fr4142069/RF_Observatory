import axios, { AxiosInstance } from 'axios';

export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 5000, // Timeout agresivo recomendado en DA-056
      headers: {
        'Content-Type': 'application/json',
        'X-Gateway-ID': process.env.GATEWAY_ID || 'DEFAULT_GATEWAY'
      }
    });
  }

  /**
   * Envía el payload normalizado a la API del Observatorio.
   */
  async sendCapture(payload: any): Promise<void> {
    try {
      await this.client.post('/captures', payload);
    } catch (error: any) {
      // Diferenciar entre errores de red (reintentables) y rechazos (400)
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        throw new Error(`REJECTED_BY_SERVER: ${error.response.data?.error?.code || error.message}`);
      }
      throw new Error(`NETWORK_ERROR: ${error.message}`);
    }
  }
}
