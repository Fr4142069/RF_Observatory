import { RegisterCaptureCommand } from '../../commands/capture/RegisterCaptureCommand';
import { RegisterCaptureResponseDTO } from '../../dto/capture/RegisterCaptureResponseDTO';
import { RegisterCaptureValidator } from '../../validators/capture/RegisterCaptureValidator';
import { CaptureRepository } from '../../../domain/repositories/CaptureRepository';
import { Capture } from '../../../domain/entities/Capture';
import { randomUUID } from 'crypto';
import { ApplicationError } from '../../errors/ApplicationError';

export class RegisterCaptureUseCase {
  constructor(private readonly captureRepository: CaptureRepository) {}

  public async execute(command: RegisterCaptureCommand): Promise<RegisterCaptureResponseDTO> {
    // 1. Validar reglas de aplicación
    RegisterCaptureValidator.validate(command);

    try {
      // 2. Construir la entidad
      const newCapture: Capture = {
        id: randomUUID(),
        sessionId: command.sessionId,
        createdAt: new Date(),
      };

      // 3. Persistir usando el repositorio inyectado
      await this.captureRepository.save(newCapture);

      // 4. Retornar el DTO de respuesta
      return {
        id: newCapture.id,
        frequency: command.frequency,
        modulation: command.modulation,
        status: 'REGISTERED',
        registeredAt: newCapture.createdAt,
      };
    } catch (error: any) {
      // Evitamos propagar errores técnicos de Prisma al exterior
      throw new ApplicationError(
        'CAPTURE_REGISTRATION_FAILED',
        `No se pudo registrar la captura: ${error.message}`
      );
    }
  }
}
