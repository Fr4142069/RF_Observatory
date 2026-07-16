import { Evidence } from '../entities/Evidence';

/**
 * @interface EvidenceRepository
 * @description
 * Contrato de acceso para las Evidencias Técnicas que respaldan las afirmaciones del sistema (Clasificaciones o Capturas).
 * Administra el linaje de las decisiones (capturas de pantalla, anotaciones, crudos).
 * 
 * @restrictions
 * Independencia tecnológica absoluta (Regla DA-006).
 */
export interface EvidenceRepository {
  /**
   * Recupera un registro de evidencia puntual por su ID.
   * @param id Identificador de la evidencia.
   */
  findById(id: string): Promise<Evidence | null>;

  /**
   * Obtiene todas las evidencias vinculadas directamente a una Captura.
   * @param captureId UUID de la captura.
   */
  findByCaptureId(captureId: string): Promise<Evidence[]>;

  /**
   * Obtiene todas las evidencias de respaldo vinculadas a una Clasificación específica.
   * @param classificationId UUID de la clasificación.
   */
  findByClassificationId(classificationId: string): Promise<Evidence[]>;

  /**
   * Persiste una nueva pieza de evidencia técnica.
   * @param evidence Objeto de dominio Evidence.
   */
  save(evidence: Evidence): Promise<void>;
}
