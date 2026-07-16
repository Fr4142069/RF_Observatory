import { PublishKnownProtocolRequestDTO } from '../../dto/protocols/PublishKnownProtocolRequestDTO';

export class PublishKnownProtocolCommand {
  public readonly protocolId: string;
  public readonly approvedBy: string;

  constructor(dto: PublishKnownProtocolRequestDTO) {
    this.protocolId = dto.protocolId;
    this.approvedBy = dto.approvedBy;
  }
}
