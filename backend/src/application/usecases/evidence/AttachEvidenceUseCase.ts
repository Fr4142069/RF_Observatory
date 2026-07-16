import { AttachEvidenceCommand } from '../../commands/evidence/AttachEvidenceCommand';
import { EvidenceResponseDTO } from '../../dto/evidence/EvidenceResponseDTO';
import { AttachEvidenceValidator } from '../../validators/evidence/AttachEvidenceValidator';
import { CaptureRepository } from '../../../domain/repositories/CaptureRepository';
import { ClassificationRepository } from '../../../domain/repositories/ClassificationRepository';
import { FingerprintRepository } from '../../../domain/repositories/FingerprintRepository';
// Simularemos un EvidenceRepository que será creado después
import { Evidence } from '../../../../shared/src/domain/entities/Evidence';
import { ApplicationError } from '../../errors/ApplicationError';
import { randomUUID } from 'crypto';

// Definición temporal de la interfaz EvidenceRepository hasta que exista en domain/repositories
export interface EvidenceRepository {
  save(evidence: Evidence): Promise<void>;
}

export class AttachEvidenceUseCase {
  constructor(
    private readonly captureRepository: CaptureRepository,
    private readonly classificationRepository: ClassificationRepository,
    private readonly fingerprintRepository: FingerprintRepository,
    private readonly evidenceRepository: EvidenceRepository
  ) {}

  public async execute(command: AttachEvidenceCommand): Promise<EvidenceResponseDTO> {
    // 1. Validar reglas de entrada
    AttachEvidenceValidator.validate(command);

    let resolvedCaptureId: string;

    // 2. Resolver el CaptureID madre dependiendo del Target
    try {
      if (command.targetType === 'CAPTURE') {
        const capture = await this.captureRepository.findById(command.targetId);
        if (!capture) throw new Error('Capture no encontrada.');
        resolvedCaptureId = capture.id;
      } 
      else if (command.targetType === 'CLASSIFICATION') {
        const classification = await this.classificationRepository.findById(command.targetId);
        if (!classification) throw new Error('Classification no encontrada.');
        resolvedCaptureId = classification.captureId;
        // En un futuro, el dominio vinculará directamente la evidencia a la clasificación
      } 
      else if (command.targetType === 'FINGERPRINT') {
        const fingerprint = await this.fingerprintRepository.findById(command.targetId);
        if (!fingerprint) throw new Error('Fingerprint no encontrado.');
        resolvedCaptureId = fingerprint.captureId;
      } 
      else {
        throw new Error('Tipo de destino inválido.');
      }
    } catch (error: any) {
      throw new ApplicationError(
        'TARGET_RESOLUTION_FAILED',
        `No se pudo resolver la entidad destino: ${error.message}`
      );
    }

    try {
      // 3. Crear la entidad Evidence (Delega al Dominio, instanciada aquí por ahora)
      const newEvidence: Evidence = {
        id: randomUUID(),
        captureId: resolvedCaptureId,
        evidenceType: { type: command.evidenceType }, // Cast simplificado al Value Object
        title: command.title,
        description: command.description,
        author: command.author,
        origin: 'SYSTEM', // O el usuario actual
        status: 'PENDING',
        referenceUri: command.referenceUri,
        textContent: command.textContent,
        createdAt: { value: new Date() }
      };

      // 4. Persistir la evidencia
      await this.evidenceRepository.save(newEvidence);

      // 5. Retornar DTO
      return {
        evidenceId: newEvidence.id,
        captureId: newEvidence.captureId,
        evidenceType: command.evidenceType,
        status: newEvidence.status,
        attachedAt: newEvidence.createdAt.value
      };
    } catch (error: any) {
      throw new ApplicationError(
        'EVIDENCE_ATTACHMENT_FAILED',
        `Error al guardar la evidencia: ${error.message}`
      );
    }
  }
}
