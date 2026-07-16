import { AttachEvidenceCommand } from '../../commands/evidence/AttachEvidenceCommand';
import { ValidationException } from '../../errors/ApplicationError';

export class AttachEvidenceValidator {
  public static validate(command: AttachEvidenceCommand): void {
    if (!command.targetId || command.targetId.trim() === '') {
      throw new ValidationException('El targetId es requerido para asociar evidencia.');
    }

    if (!['CAPTURE', 'CLASSIFICATION', 'FINGERPRINT'].includes(command.targetType)) {
      throw new ValidationException('El targetType debe ser CAPTURE, CLASSIFICATION o FINGERPRINT.');
    }

    if (!command.evidenceType || command.evidenceType.trim() === '') {
      throw new ValidationException('El evidenceType es requerido.');
    }

    if (!command.title || command.title.trim() === '') {
      throw new ValidationException('El title es requerido para la evidencia.');
    }

    if (!command.author || command.author.trim() === '') {
      throw new ValidationException('El author es requerido.');
    }

    if (!command.referenceUri && !command.textContent) {
      throw new ValidationException('Debe proporcionar un referenceUri o un textContent para la evidencia.');
    }
  }
}
