import { IHardwareAdapter } from '../adapters/IHardwareAdapter';
import { ApiClient } from './ApiClient';
import { MessageBuffer } from './MessageBuffer';

export class GatewayEngine {
  private isProcessing = false;

  constructor(
    private readonly hardwareAdapter: IHardwareAdapter,
    private readonly apiClient: ApiClient,
    private readonly buffer: MessageBuffer
  ) {}

  async start() {
    console.log('[Gateway] Iniciando motor...');
    
    // Escuchar datos del hardware
    this.hardwareAdapter.onDataReceived((rawData) => {
      // 1. Aquí iría el Normalizer (por ahora simulamos que rawData ya viene normalizado)
      const payload = rawData; 
      
      // 2. Encolar
      this.buffer.enqueue(payload);
      
      // 3. Procesar asíncronamente
      this.processBuffer();
    });

    await this.hardwareAdapter.connect();
    console.log('[Gateway] Motor operando. Escuchando hardware...');
  }

  private async processBuffer() {
    if (this.isProcessing || this.buffer.isEmpty()) return;
    
    this.isProcessing = true;
    
    while (!this.buffer.isEmpty()) {
      const payload = this.buffer.dequeue();
      
      try {
        console.log('[Gateway] Enviando captura a RF_Observatory...');
        await this.apiClient.sendCapture(payload);
        console.log('[Gateway] Captura enviada con éxito.');
      } catch (error: any) {
        console.error(`[Gateway] Error al enviar: ${error.message}`);
        
        if (error.message.includes('NETWORK_ERROR')) {
          console.log('[Gateway] Error de red detectado. Re-encolando para reintento.');
          this.buffer.requeue(payload);
          // Esperar antes de reintentar (Backoff)
          await new Promise(resolve => setTimeout(resolve, 3000));
        } else {
          console.log('[Gateway] Error irrecuperable (Rechazo API). Mensaje descartado.');
        }
        break; // Romper el ciclo de envío si hay problemas de red
      }
    }
    
    this.isProcessing = false;
  }
}
