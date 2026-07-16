import { RegisterCaptureCommand } from '../../commands/capture/RegisterCaptureCommand';
import { ValidationException } from '../../errors/ApplicationError';

export class RegisterCaptureValidator {
  public static validate(command: RegisterCaptureCommand): void {
    if (!command.sessionId || command.sessionId.trim() === '') {
      throw new ValidationException('El sessionId es requerido para registrar una captura.');
    }

    if (!command.frequency || command.frequency <= 0) {
      throw new ValidationException('La frecuencia debe ser un valor positivo.');
    }

    if (!command.modulation || command.modulation.trim() === '') {
      throw new ValidationException('La modulación es requerida.');
    }

    if (!command.bandwidth || command.bandwidth <= 0) {
      throw new ValidationException('El ancho de banda debe ser un valor positivo.');
    }

    if (!command.sampleRate || command.sampleRate <= 0) {
      throw new ValidationException('La tasa de muestreo debe ser un valor positivo.');
    }

    if (!command.rawSignalData || command.rawSignalData.trim() === '') {
      throw new ValidationException('Los datos crudos de la señal son requeridos.');
    }
  }
}
