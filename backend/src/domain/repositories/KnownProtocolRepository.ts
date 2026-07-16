import { KnownProtocol } from '../entities/KnownProtocol';

/**
 * @interface KnownProtocolRepository
 * @description
 * Define el contrato de acceso al catálogo de protocolos conocidos del sistema (ej. Manchester, EV1527).
 * Es un repositorio principalmente de lectura intensiva.
 * 
 * @restrictions
 * Sin acoplamiento a SQL o Prisma.
 */
export interface KnownProtocolRepository {
  /**
   * Recupera un protocolo conocido por su ID.
   * @param id UUID del protocolo.
   */
  findById(id: string): Promise<KnownProtocol | null>;

  /**
   * Busca un protocolo conocido por su nombre característico.
   * @param name Nombre del protocolo.
   */
  findByName(name: string): Promise<KnownProtocol | null>;

  /**
   * Recupera el catálogo completo de protocolos conocidos registrados.
   */
  findAll(): Promise<KnownProtocol[]>;

  /**
   * Registra o actualiza un nuevo protocolo conocido en el catálogo.
   * @param protocol Entidad KnownProtocol.
   */
  save(protocol: KnownProtocol): Promise<void>;
}
