import { ClassifyCaptureCommand } from '../../commands/classification/ClassifyCaptureCommand';
import { ValidationException } from '../../errors/ApplicationError';

export class ClassifyCaptureValidator {
  public static validate(command: ClassifyCaptureCommand): void {
    if (!command.captureId || command.captureId.trim() === '') {
      throw new ValidationException('El captureId es requerido para clasificar una captura.');
    }
    
    // Aquí podríamos validar el formato UUID si fuera un requerimiento estricto de entrada
  }
}
