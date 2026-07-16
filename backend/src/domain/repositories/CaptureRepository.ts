import { Capture } from '../entities/Capture';

/**
 * @interface CaptureRepository
 * @description
 * Define el contrato inmutable para la persistencia de la entidad `Capture`.
 * Las capturas pertenecen a una Sesión y actúan como contenedores de análisis RF.
 * 
 * @restrictions
 * Esta interfaz NO debe conocer detalles de infraestructura ni librerías externas.
 */
export interface CaptureRepository {
  /**
   * Guarda o actualiza una captura en el almacenamiento.
   * @param capture La entidad Capture del Dominio.
   */
  save(capture: Capture): Promise<void>;

  /**
   * Recupera una captura por su UUID.
   * @param id Identificador de la captura.
   */
  findById(id: string): Promise<Capture | null>;

  /**
   * Recupera todas las capturas asociadas a una sesión específica.
   * @param sessionId UUID de la sesión madre.
   */
  findBySessionId(sessionId: string): Promise<Capture[]>;

  /**
   * Elimina una captura específica.
   * @param id UUID de la captura a eliminar.
   */
  delete(id: string): Promise<void>;
}
