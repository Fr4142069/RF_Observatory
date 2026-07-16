import { Classification } from '../entities/Classification';

/**
 * @interface ClassificationRepository
 * @description
 * Define las abstracciones para guardar y consultar las decisiones heurísticas
 * mediante las cuales una Captura se enlaza a un Protocolo (Clasificación).
 * 
 * @restrictions
 * Según la arquitectura, el repositorio debe abstraer internamente el desdoble físico (Prisma)
 * entre KnownProtocol y UnknownProtocol para devolver siempre un objeto Classification puro al dominio.
 */
export interface ClassificationRepository {
  /**
   * Recupera la clasificación por su ID único.
   * @param id UUID de la clasificación.
   */
  findById(id: string): Promise<Classification | null>;

  /**
   * Recupera la clasificación asignada a una captura.
   * @param captureId UUID de la captura origen.
   */
  findByCaptureId(captureId: string): Promise<Classification | null>;

  /**
   * Persiste o actualiza una decisión de clasificación en el sistema.
   * @param classification La entidad Classification del Dominio.
   */
  save(classification: Classification): Promise<void>;

  /**
   * Revoca y elimina la clasificación de una captura, regresándola a un estado no clasificado.
   * @param captureId UUID de la captura.
   */
  deleteByCaptureId(captureId: string): Promise<void>;
}
