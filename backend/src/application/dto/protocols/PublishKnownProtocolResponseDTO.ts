export interface PublishKnownProtocolResponseDTO {
  readonly protocolId: string;
  readonly name: string;
  readonly status: string;
  readonly publishedAt: Date;
  readonly approvedBy: string;
}
