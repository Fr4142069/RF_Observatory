import { Modulation } from '../value-objects/Modulation';
import { Frequency } from '../value-objects/Frequency';

/**
 * Representa un estándar o protocolo de comunicación de RF documentado e identificado.
 * Actúa como la Raíz del Agregado Protocol del catálogo del sistema.
 */
export interface KnownProtocol {
  readonly id: string;
  readonly name: string;
  readonly manufacturer?: string;
  
  // Características teóricas base del protocolo
  readonly typicalFrequency?: Frequency;
  readonly modulation: Modulation;
  
  // Definiciones teóricas de pulsos y preámbulos
  readonly theoreticalPulseTolerancesMicroseconds: readonly number[];
  
  // Almacenamiento descriptivo/teórico de las reglas de decodificación.
  // IMPORTANTE: Esto no es el algoritmo ejecutable, es el modelo documental.
  readonly decodingRulesDescription: string;
  
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
