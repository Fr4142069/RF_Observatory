import { SerialAdapter } from '../capture/SerialAdapter';
import { ObservatoryClient } from '../api/ObservatoryClient';
import { AgentLogger } from '../logging/AgentLogger';

export class AgentEngine {
  constructor(
    private readonly hardwareAdapter: SerialAdapter,
    private readonly apiClient: ObservatoryClient
  ) {}

  async start() {
    AgentLogger.info('Arrancando RF Lab Agent Engine...');

    // DA-059: Manejo del evento interno
    this.hardwareAdapter.on('CaptureReceivedEvent', async (rawData: any) => {
      AgentLogger.info('Captura RF detectada. Despachando hacia Observatorio...');
      
      try {
        // TODO (TASK-007): Integrar cola temporal aquí en el futuro para evitar pérdidas si la API cae.
        // Por ahora lo pasamos directo para el Vertical Slice.
        await this.apiClient.sendCapture(rawData);
        AgentLogger.info('Captura enrutada exitosamente.');
      } catch (error: any) {
        // DA-059: Ningún dato capturado podrá desaparecer silenciosamente.
        // Si el cliente HTTP agota sus reintentos, el error llega aquí.
        AgentLogger.error('Fallo crítico al enrutar captura. Datos potencialmente perdidos (Hasta tener Queue local):', error.message);
      }
    });

    await this.hardwareAdapter.connect();
    AgentLogger.info('Engine operativo. Escuchando eventos del Hardware.');
  }
}
