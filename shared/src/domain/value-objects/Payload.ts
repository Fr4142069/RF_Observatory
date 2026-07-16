/**
 * Representa un tren de bits o bytes extraído de forma segura, garantizando inmutabilidad.
 * Al usar strings para representar Hex o Binario, mantenemos el dominio
 * desacoplado de estructuras específicas de Node (como `Buffer`) o de la base de datos.
 */
export interface Payload {
  readonly hexString: string;
  readonly binaryString?: string;
}
