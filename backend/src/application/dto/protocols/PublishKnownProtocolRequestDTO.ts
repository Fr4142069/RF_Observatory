export interface PublishKnownProtocolRequestDTO {
  readonly protocolId: string;
  readonly approvedBy: string; // ID del investigador o sistema que aprueba la certificación
}
