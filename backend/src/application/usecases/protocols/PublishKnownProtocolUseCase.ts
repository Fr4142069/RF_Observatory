import { PublishKnownProtocolCommand } from '../../commands/protocols/PublishKnownProtocolCommand';
import { PublishKnownProtocolResponseDTO } from '../../dto/protocols/PublishKnownProtocolResponseDTO';
import { PublishKnownProtocolValidator } from '../../validators/protocols/PublishKnownProtocolValidator';
import { ApplicationError } from '../../errors/ApplicationError';
import { KnownProtocol } from '../../../../../shared/src/domain/entities/KnownProtocol';

export interface KnownProtocolRepository {
  findById(id: string): Promise<KnownProtocol | null>;
  save(protocol: KnownProtocol): Promise<void>;
  // Métodos teóricos futuros para validación estricta de requisitos mínimos
  getAssociatedFingerprintsCount(protocolId: string): Promise<number>;
}

export class PublishKnownProtocolUseCase {
  constructor(
    private readonly protocolRepository: KnownProtocolRepository
  ) {}

  public async execute(command: PublishKnownProtocolCommand): Promise<PublishKnownProtocolResponseDTO> {
    PublishKnownProtocolValidator.validate(command);

    const protocol = await this.protocolRepository.findById(command.protocolId);
    if (!protocol) {
      throw new ApplicationError('PROTOCOL_NOT_FOUND', `El protocolo con ID '${command.protocolId}' no existe.`);
    }

    if (protocol.status === 'PUBLISHED') {
      throw new ApplicationError('PROTOCOL_ALREADY_PUBLISHED', `El protocolo ya se encuentra certificado y publicado.`);
    }

    if (protocol.status === 'DEPRECATED' || protocol.status === 'ARCHIVED') {
      throw new ApplicationError('INVALID_PROTOCOL_STATUS', `No se puede publicar un protocolo archivado o deprecado.`);
    }

    // Validación de requisitos mínimos (simulada por ahora)
    const fpCount = await this.protocolRepository.getAssociatedFingerprintsCount(protocol.id);
    if (fpCount === 0) {
      throw new ApplicationError('INSUFFICIENT_EVIDENCE', 'Un protocolo no puede publicarse sin Fingerprints asociados que lo validen.');
    }

    // Cambiar estado
    protocol.markAsPublished();

    // Persistir
    await this.protocolRepository.save(protocol);

    // En el futuro, aquí se emitiría un Dominio Event o se registraría un audit log
    // "Protocolo ID certificado por approvedBy en la fecha X"

    return {
      protocolId: protocol.id,
      name: protocol.name,
      status: protocol.status,
      publishedAt: new Date(),
      approvedBy: command.approvedBy
    };
  }
}
