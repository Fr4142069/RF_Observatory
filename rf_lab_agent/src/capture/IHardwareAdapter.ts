export interface IHardwareAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  onDataReceived(callback: (rawData: any) => void): void;
}
