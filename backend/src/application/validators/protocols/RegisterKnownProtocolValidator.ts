import { RegisterKnownProtocolCommand } from '../../commands/protocols/RegisterKnownProtocolCommand';
import { ValidationException } from '../../errors/ApplicationError';

export class RegisterKnownProtocolValidator {
  public static validate(command: RegisterKnownProtocolCommand): void {
    if (!command.name || command.name.trim() === '') {
      throw new ValidationException('El nombre del protocolo es requerido.');
    }
    
    if (command.frequencyHertz !== undefined && command.frequencyHertz <= 0) {
      throw new ValidationException('La frecuencia debe ser un valor positivo en Hertz.');
    }

    if (!['DRAFT', 'UNDER_REVIEW', 'VALIDATED', 'PUBLISHED', 'DEPRECATED', 'ARCHIVED'].includes(command.status)) {
      throw new ValidationException('Estado de protocolo inválido.');
    }
  }
}
