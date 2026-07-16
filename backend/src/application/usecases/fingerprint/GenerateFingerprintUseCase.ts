import { GenerateFingerprintCommand } from '../../commands/fingerprint/GenerateFingerprintCommand';
import { FingerprintResponseDTO } from '../../dto/fingerprint/FingerprintResponseDTO';
import { GenerateFingerprintValidator } from '../../validators/fingerprint/GenerateFingerprintValidator';
import { ClassificationRepository } from '../../../domain/repositories/ClassificationRepository';
import { CaptureRepository } from '../../../domain/repositories/CaptureRepository';
import { FingerprintRepository } from '../../../domain/repositories/FingerprintRepository';
import { Fingerprint } from '../../../../shared/src/domain/entities/Fingerprint';
import { ApplicationError } from '../../errors/ApplicationError';
import { randomUUID } from 'crypto';

export class GenerateFingerprintUseCase {
  constructor(
    private readonly classificationRepository: ClassificationRepository,
    private readonly captureRepository: CaptureRepository,
    private readonly fingerprintRepository: FingerprintRepository
  ) {}

  public async execute(command: GenerateFingerprintCommand): Promise<FingerprintResponseDTO> {
    // 1. Validar reglas de aplicación
    GenerateFingerprintValidator.validate(command);

    // 2. Recuperar la clasificación base
    const classification = await this.classificationRepository.findById(command.classificationId);
    if (!classification) {
      throw new ApplicationError(
        'CLASSIFICATION_NOT_FOUND',
        `La clasificación con ID ${command.classificationId} no existe.`
      );
    }

    // 3. Recuperar la captura asociada
    const capture = await this.captureRepository.findById(classification.captureId);
    if (!capture) {
      throw new ApplicationError(
        'CAPTURE_NOT_FOUND',
        `La captura asociada a esta clasificación no existe.`
      );
    }

    try {
      // 4. Invocar al Dominio para extraer el Fingerprint
      // (Aquí el UseCase asume que el Dominio procesa la captura y genera la huella.
      // En el futuro, invocaríamos un Domain Service, ej. FingerprintExtractor.extract(capture)).
      const domainFingerprint: Fingerprint = {
        id: randomUUID(),
        captureId: capture.id,
        frequency: { valueHertz: 433920000, band: 'ISM' }, // Simulado
        modulation: { type: 'ASK', schema: 'OOK' },        // Simulado
        pulseDurationsMicroseconds: [500, 1000],
        pauseDurationsMicroseconds: [500, 1000]
      };

      // 5. Persistir el Fingerprint
      await this.fingerprintRepository.save(domainFingerprint);

      // 6. Retornar el DTO
      return {
        fingerprintId: domainFingerprint.id,
        captureId: domainFingerprint.captureId,
        frequencyValueHertz: domainFingerprint.frequency.valueHertz,
        modulationType: domainFingerprint.modulation.type,
        generatedAt: new Date()
      };
    } catch (error: any) {
      throw new ApplicationError(
        'FINGERPRINT_GENERATION_FAILED',
        `Error durante la generación del fingerprint: ${error.message}`
      );
    }
  }
}
