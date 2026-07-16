import { UnknownProtocol } from '../entities/UnknownProtocol';

/**
 * @interface UnknownProtocolRepository
 * @description
 * Contrato de persistencia para los perfiles de protocolos desconocidos descubiertos durante análisis en frío.
 * 
 * @restrictions
 * Totalmente agnóstico a la implementación física subyacente.
 */
export interface UnknownProtocolRepository {
  /**
   * Recupera el perfil de un protocolo desconocido por su identificador.
   * @param id UUID del protocolo desconocido.
   */
  findById(id: string): Promise<UnknownProtocol | null>;

  /**
   * Persiste o actualiza un protocolo desconocido inferido por el sistema.
   * @param protocol Entidad UnknownProtocol.
   */
  save(protocol: UnknownProtocol): Promise<void>;

  /**
   * Elimina un perfil de protocolo desconocido si, por ejemplo, es recategorizado como conocido.
   * @param id UUID del protocolo a eliminar.
   */
  delete(id: string): Promise<void>;
}
