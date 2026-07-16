import { Timestamp } from '../value-objects/Timestamp';
import { Payload } from '../value-objects/Payload';

/**
 * Documenta el resultado inerte de aplicar una lógica de decodificación sobre una captura.
 * IMPORTANTE: NO ejecuta ningún algoritmo.
 * Un mismo tipo de entidad es utilizado independientemente del Decoder (Keeloq, OOK, etc.).
 */
export interface DecoderResult {
  readonly id: string;
  
  /**
   * Relación: Pertenece obligatoriamente a una Capture (su dueña transaccional)
   */
  readonly captureId: string;
  
  readonly status: 'SUCCESS' | 'PARTIAL' | 'FAILED';
  readonly decodedPayload?: Payload;
  
  /**
   * El identificador o nombre del motor que produjo este resultado.
   * Ej: 'Decoder_Manchester_v1', 'Decoder_Keeloq'
   */
  readonly origin: string;
  
  readonly observations?: string;
  
  readonly decodedAt: Timestamp;
}
