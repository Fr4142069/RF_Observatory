import { Session } from '../entities/Session';

/**
 * @interface SessionRepository
 * @description
 * Define el contrato inmutable para la persistencia del agregado raíz `Session`.
 * Aisla completamente al Dominio de la infraestructura subyacente (Prisma, PostgreSQL, etc.).
 * 
 * @restrictions
 * Esta interfaz NO debe importar ni depender de ningún componente de base de datos.
 */
export interface SessionRepository {
  /**
   * Guarda una nueva sesión o actualiza una existente en el almacenamiento.
   * @param session La entidad Session puramente de Dominio.
   */
  save(session: Session): Promise<void>;

  /**
   * Recupera una sesión por su identificador único.
   * @param id El UUID de la sesión.
   */
  findById(id: string): Promise<Session | null>;

  /**
   * Elimina una sesión del almacenamiento.
   * @param id El UUID de la sesión a eliminar.
   */
  delete(id: string): Promise<void>;
}
