import { QualityReport } from '../entities/QualityReport';

/**
 * @interface QualityReportRepository
 * @description
 * Define la abstracción de persistencia para los informes de calidad (QualityReport)
 * producidos objetivamente tras la evaluación de una Captura.
 * 
 * @restrictions
 * La infraestructura de base de datos debe permanecer transparente (Regla DA-006).
 */
export interface QualityReportRepository {
  /**
   * Busca el reporte de calidad asociado a una captura de radiofrecuencia.
   * @param captureId UUID de la captura.
   */
  findByCaptureId(captureId: string): Promise<QualityReport | null>;

  /**
   * Guarda o actualiza el informe de calidad para una captura.
   * @param report Entidad QualityReport.
   */
  save(report: QualityReport): Promise<void>;
}
