import { CompareFingerprintsCommand } from '../../commands/comparison/CompareFingerprintsCommand';
import { ComparisonSummaryDTO } from '../../dto/comparison/CompareFingerprintsResponseDTO';
import { CompareFingerprintsValidator } from '../../validators/comparison/CompareFingerprintsValidator';
import { FingerprintRepository } from '../../../domain/repositories/FingerprintRepository';
import { ApplicationError } from '../../errors/ApplicationError';
import { ComparisonResult } from '../../../../../shared/src/domain/entities/ComparisonResult';

// Interfaz para persistir los resultados de auditoría
export interface ComparisonResultRepository {
  save(result: ComparisonResult): Promise<void>;
}

// Interfaz del Motor en el Dominio (El Pipeline)
export interface FingerprintComparisonDomainService {
  compare(sourceId: string, candidateIds: string[]): Promise<ComparisonResult[]>;
}

export class CompareFingerprintsUseCase {
  constructor(
    private readonly fingerprintRepository: FingerprintRepository,
    private readonly comparisonResultRepository: ComparisonResultRepository,
    private readonly comparisonService: FingerprintComparisonDomainService
  ) {}

  public async execute(command: CompareFingerprintsCommand): Promise<ComparisonSummaryDTO> {
    CompareFingerprintsValidator.validate(command);

    const sourceFingerprint = await this.fingerprintRepository.findById(command.sourceFingerprintId);
    if (!sourceFingerprint) {
      throw new ApplicationError('FINGERPRINT_NOT_FOUND', `El fingerprint origen ${command.sourceFingerprintId} no existe.`);
    }

    let candidateIds: string[] = [];
    if (command.targetFingerprintId) {
      const targetFingerprint = await this.fingerprintRepository.findById(command.targetFingerprintId);
      if (!targetFingerprint) {
        throw new ApplicationError('FINGERPRINT_NOT_FOUND', `El fingerprint destino ${command.targetFingerprintId} no existe.`);
      }
      candidateIds = [command.targetFingerprintId];
    } else {
      // 1:N Global Search (Simulado: en la realidad el repositorio devolvería todos los IDs)
      // Delegamos la obtención masiva al repositorio
      candidateIds = []; // En implementación real: await this.fingerprintRepository.findAllIdsExcept(sourceId)
    }

    try {
      // Delegamos el PIPELINE NORMATIVO al Dominio. Retorna Entidades Reales.
      const domainResults: ComparisonResult[] = await this.comparisonService.compare(command.sourceFingerprintId, candidateIds);

      // Persistir Auditoría (Guardamos las entidades creadas)
      for (const result of domainResults) {
        await this.comparisonResultRepository.save(result);
      }

      // Mapear al DTO Summary
      return {
        sourceFingerprintId: command.sourceFingerprintId,
        evaluatedAt: new Date(),
        totalCandidatesEvaluated: candidateIds.length,
        matches: domainResults.map(r => ({
          id: r.id,
          targetFingerprintId: r.targetFingerprintId,
          similarityLevel: r.similarityLevel,
          confidenceTier: r.confidenceTier,
          status: r.status
        }))
      };
    } catch (error: any) {
      throw new ApplicationError('COMPARISON_FAILED', `Error durante la comparación en el dominio: ${error.message}`);
    }
  }
}
