import { IHardwareAdapter } from '../capture/IHardwareAdapter';
import { ObservatoryClient } from '../api/ObservatoryClient';
import { AgentLogger } from '../logging/AgentLogger';

export class AgentEngine {
  constructor(
    private readonly hardwareAdapter: IHardwareAdapter,
    private readonly apiClient: ObservatoryClient
  ) {}

  async start() {
    AgentLogger.info('Arrancando RF Lab Agent Engine...');

    this.hardwareAdapter.onDataReceived(async (rawData) => {
      AgentLogger.info('Captura RF detectada. Despachando hacia Observatorio...');
      
      try {
        // En una etapa posterior, aquí irá la cola de eventos (TASK-006 bis)
        await this.apiClient.sendCapture(rawData);
        AgentLogger.info('Captura enrutada exitosamente.');
      } catch (error: any) {
        AgentLogger.error('Fallo crítico al enrutar captura:', error.message);
      }
    });

    await this.hardwareAdapter.connect();
    AgentLogger.info('Engine operativo. Escuchando Hardware.');
  }
}
