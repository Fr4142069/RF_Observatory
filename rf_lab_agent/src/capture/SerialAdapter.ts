import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { EventEmitter } from 'events';
import { AgentLogger } from '../logging/AgentLogger';

export interface SerialConfig {
  path: string;
  baudRate: number;
  reconnectDelay: number;
}

export class SerialAdapter extends EventEmitter {
  private port: SerialPort | null = null;
  private parser: ReadlineParser | null = null;
  private isIntentionalClose = false;

  constructor(private readonly config: SerialConfig) {
    super();
  }

  async connect(): Promise<void> {
    this.isIntentionalClose = false;
    this.attemptConnection();
  }

  private attemptConnection() {
    if (this.port && this.port.isOpen) return;

    AgentLogger.info(`[Serial] Intentando conectar a ${this.config.path} a ${this.config.baudRate} baudios...`);

    this.port = new SerialPort({ 
      path: this.config.path, 
      baudRate: this.config.baudRate,
      autoOpen: false 
    });

    this.port.open((err) => {
      if (err) {
        AgentLogger.error(`[Serial] Falla al abrir puerto: ${err.message}. Reintentando en ${this.config.reconnectDelay}ms...`);
        this.scheduleReconnect();
        return;
      }
      AgentLogger.info(`[Serial] Conexión establecida exitosamente en ${this.config.path}`);
    });

    this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\n' }));

    this.parser.on('data', (line: string) => {
      try {
        const rawData = JSON.parse(line.trim());
        // DA-059: Publicar evento interno puro, sin lógica de negocio
        this.emit('CaptureReceivedEvent', rawData);
      } catch (e) {
        AgentLogger.info(`[Serial] Ignorando traza no-JSON: ${line.trim()}`);
      }
    });

    this.port.on('close', () => {
      if (!this.isIntentionalClose) {
        AgentLogger.error(`[Serial] Desconexión inesperada del hardware. Reintentando en ${this.config.reconnectDelay}ms...`);
        this.scheduleReconnect();
      }
    });

    this.port.on('error', (err) => {
      AgentLogger.error(`[Serial] Error en el puerto: ${err.message}`);
      // El evento 'close' se disparará automáticamente después del error si el puerto cae.
    });
  }

  private scheduleReconnect() {
    this.port = null;
    this.parser = null;
    setTimeout(() => {
      this.attemptConnection();
    }, this.config.reconnectDelay);
  }

  async disconnect(): Promise<void> {
    this.isIntentionalClose = true;
    return new Promise((resolve) => {
      if (this.port && this.port.isOpen) {
        this.port.close(() => {
          AgentLogger.info('[Serial] Puerto cerrado intencionalmente.');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}
