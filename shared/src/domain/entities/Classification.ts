import { SimilarityScore } from '../value-objects/SimilarityScore';
import { ClassificationOrigin } from '../value-objects/ClassificationOrigin';
import { Timestamp } from '../value-objects/Timestamp';

/**
 * Establece el vínculo semántico entre una señal y un protocolo.
 * Es el veredicto del sistema o de la comunidad sobre qué es exactamente una Capture.
 * 
 * IMPORTANTE: NO ejecuta algoritmos ni IA, únicamente modela el resultado 
 * (la decisión final) de cualquier motor de clasificación presente o futuro.
 */
export interface Classification {
  readonly id: string;
  
  /**
   * Relación: Pertenece obligatoriamente a una Capture (su dueña transaccional)
   */
  readonly captureId: string;
  
  /**
   * Relación: Apunta a un protocolo en el catálogo, ya sea Conocido o Desconocido.
   * El protocolo NO es dueño de la clasificación, solo una referencia semántica.
   */
  readonly protocolId: string;
  readonly protocolType: 'KNOWN' | 'UNKNOWN';
  
  readonly status: 'PENDING' | 'CONFIRMED' | 'REJECTED';
  readonly score: SimilarityScore;
  readonly origin: ClassificationOrigin;
  readonly classifiedAt: Timestamp;
  readonly observations?: string;
  
  /**
   * Referencias directas (IDs) hacia las Evidencias que sustentan este veredicto.
   */
  readonly evidenceReferences: readonly string[];
}
