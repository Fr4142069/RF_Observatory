import { DecoderResult } from '../entities/DecoderResult';

/**
 * @interface DecoderResultRepository
 * @description
 * Interfaz que define cómo se persisten y leen los resultados provenientes de la ejecución
 * de un motor de decodificación RF sobre una Captura.
 * 
 * @restrictions
 * Completamente agnóstico al motor de decodificación y a PostgreSQL.
 */
export interface DecoderResultRepository {
  /**
   * Obtiene el resultado de decodificación asociado a una captura específica.
   * @param captureId UUID de la captura.
   */
  findByCaptureId(captureId: string): Promise<DecoderResult | null>;

  /**
   * Persiste el resultado (bitstream y metadata) extraído de una señal.
   * @param result La entidad DecoderResult.
   */
  save(result: DecoderResult): Promise<void>;
}
