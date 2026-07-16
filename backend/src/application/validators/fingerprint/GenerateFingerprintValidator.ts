import { GenerateFingerprintCommand } from '../../commands/fingerprint/GenerateFingerprintCommand';
import { ValidationException } from '../../errors/ApplicationError';

export class GenerateFingerprintValidator {
  public static validate(command: GenerateFingerprintCommand): void {
    if (!command.classificationId || command.classificationId.trim() === '') {
      throw new ValidationException('El classificationId es requerido para generar un Fingerprint.');
    }
  }
}
