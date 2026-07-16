import { ClassifyCaptureCommand } from '../../commands/classification/ClassifyCaptureCommand';
import { ClassificationResponseDTO } from '../../dto/classification/ClassificationResponseDTO';
import { ClassifyCaptureValidator } from '../../validators/classification/ClassifyCaptureValidator';
import { CaptureRepository } from '../../../domain/repositories/CaptureRepository';
import { ClassificationRepository } from '../../../domain/repositories/ClassificationRepository';
import { Classification } from '../../../../shared/src/domain/entities/Classification';
import { ApplicationError } from '../../errors/ApplicationError';
import { randomUUID } from 'crypto';

export class ClassifyCaptureUseCase {
  constructor(
    private readonly captureRepository: CaptureRepository,
    private readonly classificationRepository: ClassificationRepository
  ) {}

  public async execute(command: ClassifyCaptureCommand): Promise<ClassificationResponseDTO> {
    // 1. Validar reglas de aplicación (contrato de entrada)
    ClassifyCaptureValidator.validate(command);

    // 2. Recuperar la captura
    const capture = await this.captureRepository.findById(command.captureId);
    if (!capture) {
      throw new ApplicationError('CAPTURE_NOT_FOUND', `La captura con ID ${command.captureId} no existe.`);
    }

    try {
      // 3. Invocar al Dominio para la lógica de clasificación.
      // (Aquí el UseCase delega en el Dominio. En un futuro, el Dominio usará heurísticas, IA, etc.)
      // Por ahora, simulamos la creación de la Entidad Classification que el Dominio devolvería.
      const domainClassification: Classification = {
        id: randomUUID(),
        captureId: capture.id,
        protocolId: 'unknown-protocol-id', // El dominio determinaría esto
        protocolType: 'UNKNOWN',
        status: 'PENDING', // O 'CONFIRMED' si el dominio está muy seguro
        score: { value: 0.85 }, // Value Object
        origin: { type: 'AUTOMATIC' }, // Value Object
        classifiedAt: { value: new Date() },
        evidenceReferences: []
      };

      // 4. Persistir el resultado
      await this.classificationRepository.save(domainClassification);

      // 5. Retornar el DTO de respuesta
      return {
        classificationId: domainClassification.id,
        captureId: domainClassification.captureId,
        status: domainClassification.status,
        protocolId: domainClassification.protocolId,
        protocolType: domainClassification.protocolType,
        scorePercentage: domainClassification.score.value,
        classifiedAt: domainClassification.classifiedAt.value,
      };
    } catch (error: any) {
      throw new ApplicationError(
        'CLASSIFICATION_FAILED',
        `Error durante el proceso de clasificación: ${error.message}`
      );
    }
  }
}
