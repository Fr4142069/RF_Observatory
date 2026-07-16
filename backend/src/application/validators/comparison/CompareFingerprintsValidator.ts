import { CompareFingerprintsCommand } from '../../commands/comparison/CompareFingerprintsCommand';
import { ValidationException } from '../../errors/ApplicationError';

export class CompareFingerprintsValidator {
  public static validate(command: CompareFingerprintsCommand): void {
    if (!command.sourceFingerprintId || command.sourceFingerprintId.trim() === '') {
      throw new ValidationException('El sourceFingerprintId es requerido para iniciar la comparación.');
    }
  }
}
