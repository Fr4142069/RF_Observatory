import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { IHardwareAdapter } from './IHardwareAdapter';
import { AgentLogger } from '../logging/AgentLogger';

export class SerialAdapter implements IHardwareAdapter {
  private port: SerialPort | null = null;
  private parser: ReadlineParser | null = null;
  private onDataCallback?: (rawData: any) => void;

  constructor(
    private readonly path: string,
    private readonly baudRate: number = 115200
  ) {}

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      AgentLogger.info(`Intentando conectar al puerto serial ${this.path} a ${this.baudRate} baudios...`);
      
      this.port = new SerialPort({ path: this.path, baudRate: this.baudRate }, (err) => {
        if (err) {
          AgentLogger.error(`Error abriendo puerto serial ${this.path}`, err.message);
          return reject(err);
        }
      });

      this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\n' }));

      this.parser.on('data', (line: string) => {
        try {
          const rawData = JSON.parse(line.trim());
          if (this.onDataCallback) {
            this.onDataCallback(rawData);
          }
        } catch (e) {
          AgentLogger.info(`Ignorando traza serial no-JSON: ${line.trim()}`);
        }
      });

      this.port.on('open', () => {
        AgentLogger.info(`Conexión serial establecida con éxito en ${this.path}`);
        resolve();
      });

      this.port.on('error', (err) => {
        AgentLogger.error(`Error en puerto serial:`, err.message);
      });
    });
  }

  async disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.port && this.port.isOpen) {
        this.port.close((err) => {
          if (err) {
            AgentLogger.error('Error cerrando puerto serial', err.message);
            return reject(err);
          }
          AgentLogger.info('Puerto serial cerrado.');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  onDataReceived(callback: (rawData: any) => void): void {
    this.onDataCallback = callback;
  }
}
