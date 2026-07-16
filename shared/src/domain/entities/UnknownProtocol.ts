import { Modulation } from '../value-objects/Modulation';
import { Frequency } from '../value-objects/Frequency';

/**
 * Agrupa características recurrentes de señales que aún no han sido identificadas.
 * Consolida similitudes entre múltiples huellas (Fingerprints) huérfanas
 * formando un "candidato a protocolo".
 */
export interface UnknownProtocol {
  readonly id: string;
  
  // Nombre temporal o alias asignado por la comunidad para darle seguimiento
  readonly temporaryAlias: string;
  
  // Estimaciones matemáticas derivadas de la agrupación de huellas
  readonly estimatedFrequency?: Frequency;
  readonly estimatedModulation?: Modulation;
  readonly pulseAveragesMicroseconds: readonly number[];
  
  // Registro de investigación
  readonly communityResearchNotes: string;
  
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
