import { Fingerprint } from '../entities/Fingerprint';

/**
 * @interface FingerprintRepository
 * @description
 * Contrato del dominio para almacenar y consultar las huellas físicas (Fingerprints) de una captura.
 * Administra el almacenamiento de los tiempos de pulso microsegundos (arrays masivos) aisladamente de la infraestructura.
 * 
 * @restrictions
 * Total independencia tecnológica según DA-006.
 */
export interface FingerprintRepository {
  /**
   * Persiste una huella de radiofrecuencia (Fingerprint).
   * @param fingerprint La entidad Fingerprint pura.
   */
  save(fingerprint: Fingerprint): Promise<void>;

  /**
   * Recupera un fingerprint por su ID único.
   * @param id El UUID del fingerprint.
   */
  findById(id: string): Promise<Fingerprint | null>;

  /**
   * Recupera la huella asociada a una captura específica.
   * @param captureId El UUID de la captura.
   */
  findByCaptureId(captureId: string): Promise<Fingerprint | null>;
}
