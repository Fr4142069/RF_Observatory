import { Frequency } from '../value-objects/Frequency';
import { Modulation } from '../value-objects/Modulation';

/**
 * Fingerprint: La huella dactilar matemática de la captura.
 * Abstracción estructurada de las características físicas y temporales de la señal,
 * extraída de los datos crudos. Es completamente independiente de la clasificación final.
 */
export interface Fingerprint {
  readonly id: string;
  
  /**
   * Relación: Pertenece exclusivamente a una Capture (1:1).
   */
  readonly captureId: string;
  
  // Características físicas abstractas
  readonly frequency: Frequency;
  readonly modulation: Modulation;
  
  // Características temporales.
  // En RF se suele trabajar en microsegundos para evitar decimales.
  readonly pulseDurationsMicroseconds: readonly number[];
  readonly pauseDurationsMicroseconds: readonly number[];
  readonly preambleStructure?: string;
}
