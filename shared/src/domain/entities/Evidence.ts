import { Timestamp } from '../value-objects/Timestamp';
import { EvidenceType } from '../value-objects/EvidenceType';

/**
 * Resguarda la verdad técnica e innegable de la captura.
 * IMPORTANTE: La Evidencia en el dominio representa la prueba analítica (gráficos, notas, I/Q),
 * NO la implementación física del sistema de archivos o base de datos.
 */
export interface Evidence {
  readonly id: string;
  
  /**
   * Relación: Pertenece obligatoriamente a una Capture (su dueña transaccional)
   */
  readonly captureId: string;
  
  readonly evidenceType: EvidenceType;
  readonly title: string;
  readonly description?: string;
  readonly author: string;
  readonly origin: string;
  readonly status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  
  /**
   * Referencia agnóstica al recurso.
   * El Dominio no sabe si esto es una ruta de Windows, un volumen de Docker o un bucket S3.
   * Solo almacena el localizador uniforme lógico.
   */
  readonly referenceUri?: string;
  
  /**
   * Contenido explícito para evidencias puramente analíticas (ej. Notas Técnicas)
   * que no requieren archivos externos.
   */
  readonly textContent?: string;
  
  readonly createdAt: Timestamp;
}
