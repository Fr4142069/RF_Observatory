import { Timestamp } from '../value-objects/Timestamp';
import { SignalMetrics } from '../value-objects/SignalMetrics';

/**
 * Representa la evaluación objetiva y técnica de la calidad de una captura.
 * Su existencia es independiente de la decodificación o clasificación.
 * IMPORTANTE: NO analiza señales ni calcula métricas.
 */
export interface QualityReport {
  readonly id: string;
  
  /**
   * Relación: Pertenece obligatoriamente a una Capture
   */
  readonly captureId: string;
  
  readonly overallQuality: 'EXCELLENT' | 'GOOD' | 'POOR' | 'UNUSABLE';
  readonly status: 'EVALUATED' | 'PENDING' | 'REJECTED';
  
  readonly metrics: SignalMetrics;
  readonly warnings: readonly string[];
  readonly observations?: string;
  
  readonly evaluatedAt: Timestamp;
}
