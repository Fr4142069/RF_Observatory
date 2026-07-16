import { IHardwareAdapter } from './IHardwareAdapter';

export class DummyAdapter implements IHardwareAdapter {
  private callback?: (rawData: any) => void;
  private timer?: NodeJS.Timeout;

  async connect(): Promise<void> {
    console.log('[DummyAdapter] Conectado a Hardware Simulado.');
    // Simular recepción de datos cada 10 segundos
    this.timer = setInterval(() => {
      if (this.callback) {
        console.log('[DummyAdapter] 📡 Generando pulso simulado...');
        this.callback({
          sessionId: "dummy-session-123",
          frequency: 433920000,
          modulation: "OOK",
          pulseDurations: [400, -800, 400, -800, 1200, -400],
          timestamp: new Date().toISOString()
        });
      }
    }, 10000);
  }

  async disconnect(): Promise<void> {
    if (this.timer) clearInterval(this.timer);
    console.log('[DummyAdapter] Desconectado.');
  }

  onDataReceived(callback: (rawData: any) => void): void {
    this.callback = callback;
  }
}
