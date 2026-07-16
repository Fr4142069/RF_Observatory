import { RegisterCaptureCommand } from '../../commands/capture/RegisterCaptureCommand';
import { RegisterCaptureResponseDTO } from '../../dto/capture/RegisterCaptureResponseDTO';
import { RegisterCaptureValidator } from '../../validators/capture/RegisterCaptureValidator';
import { CaptureRepository } from '../../../domain/repositories/CaptureRepository';
import { Capture } from '../../../../shared/src/domain/entities/Capture';
import { randomUUID } from 'crypto';
import { ApplicationError } from '../../errors/ApplicationError';

export class RegisterCaptureUseCase {
  constructor(private readonly captureRepository: CaptureRepository) {}

  public async execute(command: RegisterCaptureCommand): Promise<RegisterCaptureResponseDTO> {
    // 1. Validar reglas de aplicación
    RegisterCaptureValidator.validate(command);

    try {
      // 2. Construir la entidad (En un sistema real más avanzado, la Entidad validaría sus propias reglas de negocio)
      // Usaremos los value objects simplificados definidos en shared/
      const newCapture: Capture = {
        id: randomUUID(),
        sessionId: command.sessionId,
        receivedAt: { value: new Date() },
        evidences: [], // Evidencias vacías por ahora, o podríamos agregar el rawSignalData aquí
      };

      // 3. Persistir usando el repositorio inyectado
      await this.captureRepository.save(newCapture);

      // 4. Retornar el DTO de respuesta
      return {
        id: newCapture.id,
        frequency: command.frequency,
        modulation: command.modulation,
        status: 'REGISTERED',
        registeredAt: newCapture.receivedAt.value,
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
