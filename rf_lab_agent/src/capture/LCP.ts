export interface LCPPayload {
  captureId: string;
  timestamp: string;
  
  hardware: {
    deviceId: string;
    firmware: string;
    board: string;
  };
  
  radio: {
    frequency: number;
    modulation: string;
    sampleRate: number;
  };
  
  capture: {
    pulseCount: number;
    duration: number; // en microsegundos
    raw: number[]; // Array de duraciones HIGH(positivo) y LOW(negativo)
  };
}
