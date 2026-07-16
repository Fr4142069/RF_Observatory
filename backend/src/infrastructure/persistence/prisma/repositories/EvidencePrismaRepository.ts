import { PrismaClient } from '@prisma/client';
import { EvidenceRepository } from '../../../../domain/repositories/EvidenceRepository';
import { Evidence } from '../../../../domain/entities/Evidence';

/**
 * @class EvidencePrismaRepository
 * @description
 * Materializa el contrato `EvidenceRepository` operando sobre Prisma.
 * @implements {EvidenceRepository}
 */
export class EvidencePrismaRepository implements EvidenceRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findById(id: string): Promise<Evidence | null> {
    const evidence = await this.prisma.evidence.findUnique({ where: { id } });
    return evidence ? (evidence as unknown as Evidence) : null;
  }

  async findByCaptureId(captureId: string): Promise<Evidence[]> {
    const evidences = await this.prisma.evidence.findMany({
      where: { captureId },
    });
    return evidences as unknown as Evidence[];
  }

  async findByClassificationId(classificationId: string): Promise<Evidence[]> {
    // La relación M:N de Prisma se maneja buscando las evidencias que estén conectadas a la clasificación.
    const evidences = await this.prisma.evidence.findMany({
      where: {
        classifications: {
          some: { id: classificationId }
        }
      }
    });
    return evidences as unknown as Evidence[];
  }

  async save(evidence: Evidence): Promise<void> {
    const data = evidence as any;
    await this.prisma.evidence.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }
}
