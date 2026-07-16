import { PublishKnownProtocolCommand } from '../../commands/protocols/PublishKnownProtocolCommand';
import { ValidationException } from '../../errors/ApplicationError';

export class PublishKnownProtocolValidator {
  public static validate(command: PublishKnownProtocolCommand): void {
    if (!command.protocolId || command.protocolId.trim() === '') {
      throw new ValidationException('El ID del protocolo es requerido.');
    }
    
    if (!command.approvedBy || command.approvedBy.trim() === '') {
      throw new ValidationException('Debe especificarse quién aprueba la certificación del protocolo.');
    }
  }
}
