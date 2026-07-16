export interface IHardwareAdapter {
  /**
   * Conecta con el hardware subyacente (Serial, TCP, etc.)
   */
  connect(): Promise<void>;

  /**
   * Desconecta el hardware de forma segura.
   */
  disconnect(): Promise<void>;

  /**
   * Registra un callback que será invocado cada vez que el hardware
   * envíe una nueva trama de datos crudos.
   */
  onDataReceived(callback: (rawData: any) => void): void;
}
